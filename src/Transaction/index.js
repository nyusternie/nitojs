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

    /* Send Coin */
    static sendCoin(_coin, _outs, _doValidation) {
        // return await require('./sendCoin')(_coin, _outs, _doValidation)
        return require('./sendCoin')(_coin, _outs, _doValidation)
    }
}

/* Export module. */
module.exports = Transaction
