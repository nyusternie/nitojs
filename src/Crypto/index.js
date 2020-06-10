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

    /* Mnemonic */
    static mnemonic(_entropy, _language) {
        return require('./mnemonic')(_entropy, _language)
    }

    /* Random Bytes */
    static randomBytes(_size) {
        return require('./randomBytes')(_size)
    }

}

/* Export module. */
module.exports = Utils
