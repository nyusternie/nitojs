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
    if (!_address) {
        throw new Error('Invalid address.')
    }

    /* Validate object. */
    if (typeof(_address) === 'object') {
        /* Validate public key. */
        if (_address.publicKey) {
            /* Initialize public key. */
            const pubkey = bch.PublicKey(_address.publicKey.toString())

            /* Convert to cash address. */
            _address = bch.Address(pubkey).toString()
        }
    }

    /* Validate public script hash. */
    if (_address.length === 50) {
        if (_address.slice(0, 4) === '76a9' && _address.slice(-4) === '88ac') {
            /* Initialize public script hash. */
            const scriptPubKey = bch.Script(_address)

            /* Convert to cash address. */
            _address = bch.Address(scriptPubKey).toString()
        }
    }

    debug(`Converting [ ${_address} ] to its cash address format.`)

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
