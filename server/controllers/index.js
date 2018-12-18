const axios = require('axios');

module.exports = {
    getTransactionInfo: async (req, res, next) => {
        // const data_request = await axios.default.get('https://komodo.forest.network/tx_search?query="account=\'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI\'\"');
        res.end('https://komodo.forest.network/tx_search?query="account=\'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI\'\"');
    }
}