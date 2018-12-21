const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    // public_key: {
    //     type: String,
    //     required: true
    // },
    // balance: {
    //     type: Number,
    //     default: 0
    // },
    // sequence: {
    //     type: Number,
    //     default: 0
    // },
    // bandwidth: {
    //     type: Number,
    //     default: 0
    // }

    /*
     * copy <- lib/account
     */
    address: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
    bandwidth: {
        type: Number,
        required: true,
    },
    // Last transaction date for bandwidth calculate
    bandwidthTime: {
        type: Date,
    }
})

module.exports = Account = mongoose.model('account', AccountSchema);