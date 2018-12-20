const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    public_key: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    sequence: {
        type: Number,
        default: 0
    },
    bandwidth: {
        type: Number,
        default: 0
    }
})

module.exports = Account = mongoose.model('account', AccountSchema);