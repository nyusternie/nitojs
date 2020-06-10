/* Import modules. */
const bch = require('bitcore-lib-cash')
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:tocashaddr')

/**
 * To Public Key (Script) Hash
 *
 * Encodes an address to a public key hash.
 */
const toPubKeyScript = function (_address) {
    debug(`Converting [ ${_address} ] to its pubKeyHash.`)

    /* Validate address. */
    if (!_address || !bchaddr.isValidAddress(_address)) {
        throw new Error('Invalid address.')
    }

    /* Initialize (Bitcoin Cash) address. */
    const address = bchaddr.toCashAddress(_address)

    /* Conver to public key hash. */
    const pubKeyHash = bch.Script.buildPublicKeyHashOut(address).toHex()

    /* Return public key hash. */
    return pubKeyHash
}

/* Export module. */
module.exports = toPubKeyScript
