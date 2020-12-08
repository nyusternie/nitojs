/* Import modules. */
const debug = require('debug')('nitojs:slp')
const EventEmitter = require('events').EventEmitter

/**
 * SLP Class
 *
 * Handles Simple Ledger Protocol (SLP) processing.
 */
class SLP extends EventEmitter {
    constructor() {
        super()

        debug('SLP class has been initialized.')
    }

    /* Balance */
    // NOTE: Returns a promise.
    static balance(_txid) {
        return require('./balance')(_txid)
    }

    /* Create Token */
    // NOTE: Returns a transaction.
    static create(_params) {
        return require('./create')(_params)
    }

    /* Get Raw SLP */
    // NOTE: Returns a promise.
    // static getRawSLP(_txid, _verbose) {
    //     return require('./getRawSLP')(_txid, _verbose)
    // }

    /* Send Coin */
    // NOTE: Returns a promise.
    // static sendCoin(_coin, _receivers, _autoFee) {
    //     return require('./sendCoin')(_coin, _receivers, _autoFee)
    // }

    /* Send Raw SLP */
    // NOTE: Returns a promise.
    // static sendRawSLP(_rawTx) {
    //     return require('./sendRawSLP')(_rawTx)
    // }

    /* SLPDB Query */
    get Query() {
        return require('./Query')
    }

    /* (Static) SLPDB Query */
    static get Query() {
        return require('./Query')
    }

}

/* Export module. */
module.exports = SLP
