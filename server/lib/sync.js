const moment = require('moment');
const Decimal = require('decimal.js');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('./db');
const Block = require('./block');
const Account = require('./account');
const Transaction = require('./transaction');
const Info = require('./info')
const Post = require('./post')
const Interact = require('./interact')

const { decode, verify, hash, contentDecode } = require('./tx');

// 24 hours
const BANDWIDTH_PERIOD = 86400;
const INITIAL_APP_HASH = Buffer.from('forest.network by Kha Do');
const ACCOUNT_KEY = Buffer.from('account');
const OBJECT_KEY = Buffer.from('object');
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

// Sync DB
const { RpcClient } = require('tendermint')
const Client = RpcClient('wss://dragonfly.forest.network:443')

const BlockSync = {
  async getInfo() {
    const latestBlock = await Block.findOne({
      order: [['time', 'DESC']],
    });
    if (latestBlock) {
      return latestBlock.height;
    }
    return 0;
  },

  async beginBlock() {
    const latestBlock = await Block.findOne({
      order: [['time', 'DESC']],
    });
    if (latestBlock) {
      this.currentBlock = {
        height: latestBlock.height,
        hash: latestBlock.hash,
        time: latestBlock.time,
        appHash: latestBlock.appHash,
      }
    } else {
      this.currentBlock = null;
    }
  },

  async executeTx(buf, dbTransaction, isCheckTx) {
    // Tag by source account and to account
    const tags = [];
    if (isCheckTx) {
      console.log('Check tx');
    } else {
      console.log('Deliver tx');
    }
    const tx = decode(buf);
    const txSize = buf.length;
    tx.hash = hash(tx);
    const { operation } = tx;
    // Check signature
    if (!verify(tx)) {
      throw Error('Wrong signature');
    }
    // Check account
    const account = await Account.findByPk(tx.account, { transaction: dbTransaction });
    if (!account) {
      throw Error('Account does not exists');
    }
    // ++sequence
    account.sequence = tx.sequence;
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
    await account.save({ transaction: dbTransaction });

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

      console.log(`created ${address}`);
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
      console.log(`${account.address} transfered ${amount} to ${address}`);
    } else if (operation === 'post') {
      const { content, keys } = tx.params;
      await Post.create({
        hash: tx.hash,
        author: tx.account,
        content: content,
        keys: keys,
      }, { transaction: dbTransaction })
      console.log(`${account.address} posted ${content.length} bytes with ${keys.length} keys`);
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
      console.log(`${account.address} update ${key} with ${value.length} bytes`);
    } else if (operation === 'interact') {
      const { object, content } = tx.params;
      // Check if object exists
      const transaction = await Transaction.findByPk(object, { transaction: dbTransaction });
      if (!transaction) {
        throw Error('Object does not exist');
      }
      const { type } = contentDecode(content);
      switch (type) {
        case 2:
          const found = await Interact.find({
            where: {
              hash: object,
              type: type,
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

      tx.params.address = transaction.author;
      console.log(`${account.address} interact ${object} with ${content.length} bytes`);
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
    }, {
        transaction: dbTransaction,
      });

    if (tx.account) {
      tags.push({ key: ACCOUNT_KEY, value: Buffer.from(tx.account) });
    }
    if (tx.params && tx.params.address && tx.params.address !== tx.account) {
      tags.push({ key: ACCOUNT_KEY, value: Buffer.from(tx.params.address) });
    }
    if (tx.params && tx.params.object) {
      tags.push({ key: OBJECT_KEY, value: Buffer.from(tx.params.object) });
    }
    tx.tags = tags;
    return tx;
  },

  async checkTx(buf) {
    // Create new transaction then rollback to old state
    const checkTransaction = await db.transaction();
    try {
      const tx = await this.executeTx(buf, checkTransaction, true);
      await checkTransaction.rollback();
      return {};
    } catch (err) {
      await checkTransaction.rollback();
      return { code: 1, log: err.toString() };
    }
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

  async sync() {
    console.log('SYNCING........');
    let height = parseInt(await this.getInfo()) + 1;

    while (true) {
      try {
        const block = await Client.block({ height });
        const numTx = parseInt(block.block.header.num_txs);
        const txs = block.block.data.txs;

        for (let i = 0; i < numTx; i++) {
          const buf = Buffer.from(txs[i], 'base64');
          let result = await this.deliverTx(buf);
          if (result)
            console.log(result);
        }

        const meta = block.block_meta;
        this.currentBlock = {
          height: meta.header.height,
          hash: meta.block_id.hash,
          time: meta.header.time,
          appHash: meta.header.app_hash,
        }

        await Block.create(this.currentBlock);
        height++;
      } catch (err) {
        console.log('SYNCED.........')
        setTimeout(() => {
          this.sync();
        }, 60000)
        return;
      }
    }
  },
};

module.exports = BlockSync
