const {
    encode, decode
} = require('./../lib/tx/v1')

const transaction = require('./../lib/tx/index')

// let tx = {
//     version: 1,
//     account : 'GDQVHLWFQW3M6H23J2IMRMBK4MHZ5ZF56LJWN7WNXPAMRTL5MQPVCPKL',
//     sequence: 1,
//     memo: Buffer.from('Create account'),
//     operation: 'create_account',
//     params: {
//         address: 'GAHBJ57OM3Z6B5D6BRZOYKEEDYXLIFVLNJTCNCJ2INB4ZPNWUUUXS73W'
//     },
// }
// console.log(tx);
// transaction.sign(tx, 'SCRC7SUP5WKJLEFWCUSBBLJ7RI2TCDLA5O6Q4BWBFW2M57JNTCVN3LIO')
// const data = '0x' + transaction.encode(tx).toString('hex');

// console.log(typeof Buffer.from('Create account'));
// console.log(Buffer.isBuffer(Buffer.from('Create account')));

let buff = Buffer.from('ATDhU67FhbbPH1tOkMiwKuMPnuS98tNm/s27wMjNfWQfUT1LAAAAAAAAAAETVGVzdCBjcmVhdGUgYWNjb3VudAEAIzDFGobSCKj/8R8trhRfvoCvMYFD4LMBhpNnxKwBGguNLFAPXa/tmwCqImHCUBSfdqkMOpqk1v2uy1xY93dICvn+uWd8IonZjKfj8609tSRV3Fm/UotIVpSLS7sBqwrL9XR2Dw==', 'base64');
let data = decode(buff);

console.log(data);