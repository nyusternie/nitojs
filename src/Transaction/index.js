const debug = require('debug')('nitojs:transaction')
const EventEmitter = require('events').EventEmitter

/**
 * Transaction
 */
class Transaction extends EventEmitter {
    constructor() {
        super()
    }

    static async sendCoin(_coin, _outs, _doValidation) {
        debug('Sending a coin:', _coin, _outs, _doValidation)
        return await require('./sendCoin')(_coin, _outs, _doValidation)
    }
}

/* Export module. */
module.exports = Transaction
