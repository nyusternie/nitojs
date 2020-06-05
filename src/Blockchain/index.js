const debug = require('debug')('nitojs:transaction')
const EventEmitter = require('events').EventEmitter

/**
 * Blockchain Class
 */
class Blockchain extends EventEmitter {
    constructor() {
        super()
    }

    /* Estimate Fee */
    static async estimateFee() {
        debug('Fee estiamte: ...')
        return 1.1 // measured in (fractional) satoshis
    }

}

/* Export module. */
module.exports = Blockchain
