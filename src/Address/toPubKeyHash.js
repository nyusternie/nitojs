/* Import modules. */
const bch = require('bitcore-lib-cash')
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:tocashaddr')

/**
 * To Public Key (Script) Hash
 *
 * Encodes an address to a public key hash.
 */
const toPubKeyHash = function (_address) {
    debug(`Converting [ ${_address} ] to its public key (script) hash.`)

    /* Validate address. */
    if (!_address || !bchaddr.isValidAddress(_address)) {
        throw new Error('Invalid address.')
    }

    /* Initialize (Bitcoin Cash) address. */
    const cashAddress = bchaddr.toCashAddress(_address)

    /* Initialize public key hash. */
    let pubKeyHash = null

    /* Handle address type. */
    if (bchaddr.isP2PKHAddress(cashAddress)) {
        /* Convert to public key hash. */
        pubKeyHash = bch.Script.buildPublicKeyHashOut(cashAddress).toHex()
    } else if (bchaddr.isP2SHAddress(cashAddress)) {
        /* Set (script) address. */
        const address = bch.Address(cashAddress)

        /* Convert to public key hash. */
        // NOTE: Script buffers are hashed when building.
        //       ie. `Hash.sha256ripemd160(script.toBuffer())`
        pubKeyHash = bch.Script.buildScriptHashOut(address).toHex()
    } else {
        throw new Error('Invalid address.')
    }

    /* Return public key hash. */
    return pubKeyHash
}

/* Export module. */
module.exports = toPubKeyHash
