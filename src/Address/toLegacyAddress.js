/* Import modules. */
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:tolegacyaddr')

/**
 * To Legacy Address
 *
 * Converts a Bitcoin Cash address to its legacy address format.
 */
const toLegacyAddress = function (_address) {
    debug(`Converting [ ${_address} ] to its legacy address format.`)

    /* Validate address. */
    if (!_address || !bchaddr.isValidAddress(_address)) {
        throw new Error('Invalid address.')
    }

    /* Initialize (legacy) address. */
    const address = bchaddr.toLegacyAddress(_address)

    /* Return (legacy) address. */
    return address
}

/* Export module. */
module.exports = toLegacyAddress
