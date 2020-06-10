/* Import modules. */
const debug = require('debug')('nitojs:address:details')

/**
 * Details
 *
 * Retrieves addres details.
 */
const details = async (_address) => {
    debug('Requesting details for address:', _address)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Request history. */
    const details = await Insomnia.history(_address)

    /* Return details. */
    return details
}

/* Export module. */
module.exports = details
