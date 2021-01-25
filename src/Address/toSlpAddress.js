/* Import modules. */
const bch = require('bitcore-lib-cash')
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:toslpaddr')

/**
 * To SLP Address
 *
 * Converts a (cash/legacy) address to its Bitcoin SLP address format.
 */
const toSlpAddress = function (_address) {
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

    /* Validate public script hash (P2PKH). */
    if (_address.length === 50) {
        /* Detect public script hash. */
        if (_address.slice(0, 6) === '76a914' && _address.slice(-4) === '88ac') {
            /* Initialize public script hash. */
            const scriptPubKey = bch.Script(_address)

            /* Convert to cash address. */
            _address = bch.Address(scriptPubKey).toString()
        }
    }

    /* Validate public script hash (P2SH). */
    if (_address.length === 46) {
        /* Detect public script hash. */
        if (_address.slice(0, 4) === 'a914' && _address.slice(-2) === '87') {
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

    /* Initialize (Bitcoin SLP) address. */
    const address = bchaddr.toSlpAddress(_address)

    /* Return (Bitcoin SLP) address. */
    return address
}

/* Export module. */
module.exports = toSlpAddress
