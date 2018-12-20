const { Keypair } = require('stellar-base');

const key = Keypair.random();

console.log('Public: ', key.publicKey());
console.log('Secret:', key.secret());