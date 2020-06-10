/* Import modules. */
const debug = require('debug')('nitojs:transaction')
const EventEmitter = require('events').EventEmitter

/**
 * Transaction Class
 *
 * Handles transaction processing.
 */
class Transaction extends EventEmitter {
    constructor() {
        super()

        debug('Transaction class has been initialized.')
    }

    /* Details */
    // NOTE: Returns a promise.
    static details(_txid) {
        return require('./getRawTransaction')(_txid, true)
    }

    /* Get Raw Transaction */
    // NOTE: Returns a promise.
    static getRawTransaction(_txid, _verbose) {
        return require('./getRawTransaction')(_txid, _verbose)
    }

    /* Send Coin */
    // NOTE: Returns a promise.
    static sendCoin(_coin, _receivers, _autoFee) {
        return require('./sendCoin')(_coin, _receivers, _autoFee)
    }

    /* Send Raw Transaction */
    // NOTE: Returns a promise.
    static sendRawTransaction(_rawTx) {
        return require('./sendRawTransaction')(_rawTx)
    }

}

/* Export module. */
module.exports = Transaction
