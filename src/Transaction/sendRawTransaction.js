/* Import modules. */
const debug = require('debug')('nitojs:transaction:sendrawtx')

/**
 * Send Raw Transaction
 */
const sendRawTransaction = async (_rawTx) => {
    debug('Sending raw transaction:', _rawTx)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Return transaction id. */
    return await Insomnia.broadcast(_rawTx)
}

/* Export module. */
module.exports = sendRawTransaction
