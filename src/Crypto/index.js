/* Import modules. */
const debug = require('debug')('nitojs:crypto')
const EventEmitter = require('events').EventEmitter

/**
 * Crypto Class
 *
 * Cryptographic functions for blockchain management.
 */
class Crypto extends EventEmitter {
    constructor() {
        super()

        debug('Crypto class has been initialized.')
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
module.exports = Crypto
