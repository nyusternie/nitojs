/* Import modules. */
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:islegacyaddress')

/**
 * Is Legacy Address
 *
 * Validates address.
 */
const isLegacyAddress = (_address) => {
    debug('Validating address:', _address)

    /* Return validation result. */
    return bchaddr.isLegacyAddress(_address)
}

/* Export module. */
module.exports = isLegacyAddress
