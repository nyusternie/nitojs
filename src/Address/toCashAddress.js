/* Import modules. */
const bch = require('bitcore-lib-cash')
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:tocashaddr')

/**
 * To Cash Address
 *
 * Converts a legacy address to its Bitcoin Cash address format.
 */
const toCashAddress = function (_address) {
    /* Validate address. */
    if (typeof(_address) === 'object') {
        /* Validate public key. */
        if (_address.publicKey) {
            /* Set public key. */
            const pubkey = bch.PublicKey(_address.publicKey.toString())

            /* Convert to cash address. */
            _address = bch.Address(pubkey).toString()
        }
    } else {
        debug(`Converting [ ${_address} ] to its cash address format.`)
    }

    /* Validate address. */
    if (!_address || !bchaddr.isValidAddress(_address)) {
        throw new Error('Invalid address.')
    }

    /* Initialize (Bitcoin Cash) address. */
    const address = bchaddr.toCashAddress(_address)

    /* Return (Bitcoin Cash) address. */
    return address
}

/* Export module. */
module.exports = toCashAddress
