/* Import modules. */
const bchaddr = require('bchaddrjs')
const debug = require('debug')('nitojs:address:iscashaddress')

/**
 * Is Cash Address
 *
 * Validates address.
 */
const isCashAddress = async (_address) => {
    debug('Validating address:', _address)

    /* Return validation result. */
    return bchaddr.isCashAddress(_address)
}

/* Export module. */
module.exports = isCashAddress
