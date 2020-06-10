/* Import modules. */
const Nito = require('nitojs')

/**
* Get (Total Wallet) Balance
*
* Retrieves the current (total) wallet balance.
*
* NOTE: Optional (market price) parameter is used to calculate fiat value,
*       and return a "formatted" value package.
*/
const getBalance = (state, getters) => async (_currency) => {
    /* Validate coins. */
    if (!getters.getCoins) {
        return null
    }

    console.log('TICKER', Nito.Markets.getTicker(_currency))

    // TODO: ...
}

/* Export module. */
export default getBalance
