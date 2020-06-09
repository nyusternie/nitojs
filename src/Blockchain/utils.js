/* Import modules. */
const debug = require('debug')('nitojs:blockchain:socket')
const EventEmitter = require('events').EventEmitter

/**
 * Utility Class
 *
 * Useful functions for blockchain management.
 */
class Utils extends EventEmitter {
    constructor() {
        super()
    }

    /**
     * Estimate Fee
     */
    estimateFee() {
        debug('Estimating fee...')
    }

}

/* Export module. */
module.exports = Utils
