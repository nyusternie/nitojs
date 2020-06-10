/* Import modules. */
const debug = require('debug')('nitojs:address:balance')

/**
 * Balance
 *
 * Retrieves the balances (confirmed and unconfirmed) for an address.
 */
const balance = async (_address) => {
    debug('Requesting balances for address:', _address)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Request balances. */
    const balances = await Insomnia.balance(_address)

    /* Return balance. */
    return balances
}

/* Export module. */
module.exports = balance
