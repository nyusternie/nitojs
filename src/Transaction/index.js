const debug = require('debug')('nitojs:transaction')
const EventEmitter = require('events').EventEmitter

/**
 * Transaction
 */
class Transaction extends EventEmitter {
    constructor() {
        super()
    }

    static sendCoin(_coin, _outs, _doValidation) {
        debug('Sending a coin:', _coin, _outs, _doValidation)
        require('./sendCoin')(_coin, _outs, _doValidation)
    }
}

/* Export module. */
module.exports = Transaction
