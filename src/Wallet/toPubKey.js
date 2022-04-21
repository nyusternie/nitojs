/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:address:topubkey')

/**
 * To Public Key
 *
 * Retrieves the extended public key for a wallet (node).
 */
const toPubKey = function () {
    debug('Current node:', this.node)

    /* Set HD private key. */
    const hdPrivateKey = new bch.HDPrivateKey(this.node.toString())

    /* Retrieve extended public key. */
    const extPubKey = hdPrivateKey.hdPublicKey.toString()

    /* Return extended public key. */
    return extPubKey
}

/* Export module. */
module.exports = toPubKey
