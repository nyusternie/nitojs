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

    /* Hashing */
    static hash(_message, _algo, _hexFormat) {
        return require('./hash')(_message, _algo, _hexFormat)
    }

    /* Mnemonic */
    static mnemonic(_entropy, _language) {
        return require('./mnemonic')(_entropy, _language)
    }

    /* Random Bytes */
    static randomBytes(_size) {
        return require('./randomBytes')(_size)
    }

    /* SHA-256 */
    static sha256(_message) {
        return require('./hash')(_message, 'sha256')
    }

}

/* Initialize aliases. */
Crypto.sha512 = Crypto.hash

/* Export module. */
module.exports = Crypto
