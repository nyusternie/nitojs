/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:address:tostring')

/**
 * To String
 *
 * Converts and address to a string.
 */
const toString = function () {
    debug('Public key:', this.publicKey)

    /* Return public key as an address. */
    return bch.Address(this.publicKey).toString()
}

/* Export module. */
module.exports = toString
