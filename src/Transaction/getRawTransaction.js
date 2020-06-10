/* Import modules. */
const debug = require('debug')('nitojs:transaction:getrawtx')

/**
 * Get Raw Transaction
 */
const getRawTransaction = async (_txid, _verbose) => {
    debug('Requesting raw transaction:', _txid, _verbose)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Return transaction data. */
    return await Insomnia.transaction(_txid, _verbose)
}

/* Export module. */
module.exports = getRawTransaction
