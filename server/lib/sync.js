const moment = require('moment');
const Decimal = require('decimal.js');
// const crypto = require('crypto');
const _ = require('lodash');
const db = require('./db');
const Block = require('./block');
const Account = require('./account');
const Transaction = require('./transaction');
const Info = require('./info')
const Post = require('./post')
const Interact = require('./interact')
const { decode, hash, Content } = require('./tx');

// 24 hours
const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

// Sync DB
const { RpcClient } = require('tendermint')
const Client = RpcClient('ws://0.0.0.0:26657')

const BlockSync = {
  async getInfo() {
    const latestBlock = await Block.findOne({
      order: [['time', 'DESC']],
    });
    if (latestBlock) {
      return latestBlock.height;
    }
    this.currentBlock = null;
    return 0;
  },

  async executeTx(buf, dbTransaction, isCheckTx) {
    // Tag by source account and to account
    const tx = decode(buf);
    const txSize = buf.length;
    tx.hash = hash(tx);
    const { operation } = tx;

    const account = await Account.findByPk(tx.account);
    if (!account) {
      throw Error('Account does not exists');
    }
    // Update bandwidth
    if (this.currentBlock) {
      const diff = account.bandwidthTime
        ? moment(this.currentBlock.time).unix() - moment(account.bandwidthTime).unix()
        : BANDWIDTH_PERIOD;
      const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
      // 24 hours window max 65kB
      account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
      if (account.bandwidth > bandwidthLimit) {
        throw Error('Bandwidth limit exceeded');
      }
      // Check bandwidth
      account.bandwidthTime = this.currentBlock.time;
    }
    // Check sequence
    const nextSequence = new Decimal(account.sequence).add(1);
    account.sequence = (new Decimal(tx.sequence)).toFixed();
    if (!nextSequence.equals(tx.sequence)) {
      throw Error('Sequence mismatch');
    }
    await account.save();

    // Process operation
    if (operation === 'create_account') {
      const { address } = tx.params;
      const found = await Account.findByPk(address, { transaction: dbTransaction });
      if (found) {
        throw Error('Account address existed');
      }
      await Account.create({
        address,
        balance: 0,
        sequence: 0,
        bandwidth: 0,
      }, { transaction: dbTransaction });

      await Info.create({
        address,
      }, { transaction: dbTransaction })
    } else if (operation === 'payment') {
      const { address, amount } = tx.params;
      const found = await Account.findByPk(address, { transaction: dbTransaction });
      if (!found) {
        throw Error('Destination address does not exist');
      }
      if (address === tx.account) {
        throw Error('Cannot transfer to the same address');
      }
      if (amount <= 0) {
        throw Error('Amount must be greater than 0');
      }
      if (new Decimal(amount).gt(account.balance)) {
        throw Error('Amount must be less or equal to source balance');
      }
      found.balance = new Decimal(found.balance).add(amount).toFixed();
      account.balance = new Decimal(account.balance).sub(amount).toFixed();
      await found.save({ transaction: dbTransaction });
      await account.save({ transaction: dbTransaction });
    } else if (operation === 'post') {
      const { content, keys } = tx.params;
      await Post.create({
        hash: tx.hash,
        author: tx.account,
        content: content,
        keys: keys,
      }, { transaction: dbTransaction })
    } else if (operation === 'update_account') {
      const { key, value } = tx.params;
      const found = await Info.findByPk(account.address);
      if (!found) {
        throw Error('Account does not exists');
      }
      switch (key) {
        case 'name':
          found.name = value;
          break;
        case 'picture':
          found.picture = value;
          break;
        case 'followings':
          found.followings = value;
          break;
      }
      await found.save({ transaction: dbTransaction });
    } else if (operation === 'interact') {
      const { object, content } = tx.params;
      // Check if object exists
      const { type } = Content.decode(content);
      console.log(type)
      switch (type) {
        case 2:
          const found = await Interact.find({
            where: {
              hash: object,
              type: 2,
              author: tx.account,
            }
          }, { transaction: dbTransaction })
          if (found) {
            found.content = content;
            await found.save({ transaction: dbTransaction });
            break;
          }
        case 1:
          await Interact.create({
            hash: object,
            author: tx.account,
            type: type,
            content: content,
          }, { transaction: dbTransaction })
          break;
      }
    } else {
      throw Error('Operation is not support.');
    }

    // Check bandwidth usage < account balance
    const blockedAmount = Math.ceil(account.bandwidth / NETWORK_BANDWIDTH * MAX_CELLULOSE);
    console.log('Blocked amount:', blockedAmount);
    if (new Decimal(account.balance).lt(blockedAmount)) {
      throw Error('Account balance must greater blocked amount due to bandwidth used');
    }

    // Add transaction to db
    await Transaction.create({
      hash: tx.hash,
      author: account.address,
      operation: operation,
    }, {
        transaction: dbTransaction,
      });
  },

  async deliverTx(buf) {
    // Execute within block db transaction
    const deliverTransaction = await db.transaction({
      transaction: this.blockTransaction,
    });
    try {
      await this.executeTx(buf, deliverTransaction, false);
      await deliverTransaction.commit();
    } catch (err) {
      await deliverTransaction.rollback();
      return { code: 1, log: err.toString() };
    }
  },

  async commitBlock(block) {
    console.log("\tON COMMIT BLOCK...")
    const numTx = parseInt(block.header.num_txs);
    const txs = block.data.txs;

    for (let i = 0; i < numTx; i++) {
      const buf = Buffer.from(txs[i], 'base64');
      let result = await this.deliverTx(buf);
      if (result)
        console.log(result);
    }

    const header = block.header;
    this.currentBlock = {
      height: header.height,
      time: header.time,
    }

    await Block.create(this.currentBlock);
    console.log("\tDONE...")
  },

  async sync() {
    console.log('SYNCING........');
    let height = parseInt(await this.getInfo()) + 1;
    console.log(`\tBlock height : ${height}`);
    while (true) {
      try {
        const block = await Client.block({ height });
        await this.commitBlock(block.block);
        height++;
      } catch (err) {
        Client.close();
        console.log('SYNCED.........');
        return;
      }
    }
  },
};

module.exports = BlockSync
