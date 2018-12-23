const { Keypair } = require('stellar-base');

const key = Keypair.random();

console.log('Public: ', key.publicKey());
console.log('Secret:', key.secret());

// let StellarSdk = require("stellar-sdk");
// let keypair = StellarSdk.Keypair.fromSecret('SCRC7SUP5WKJLEFWCUSBBLJ7RI2TCDLA5O6Q4BWBFW2M57JNTCVN3LIO');
// console.log(keypair.publicKey());

// const key = Keypair.fromSecret('SCRC7SUP5WKJLEFWCUSBBLJ7RI2TCDLA5O6Q4BWBFW2M57JNTCVN3LIO');

// console.log(key.publicKey());