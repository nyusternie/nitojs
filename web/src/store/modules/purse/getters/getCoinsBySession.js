/**
 * Get Session Coins
 *
 * Returns UTXOs for ALL (in-use) session coins.
 */
const getCoinsBySession = (state, getters) => (_sessionId) => {
    /* Validate coins. */
    if (!getters.getCoins) {
        return null
    }

    /* Initialize coins. */
    const coins = getters.getCoins

    /* Initialize (session) coins. */
    const sessionCoins = coins[_sessionId]

    /* Return (session) coins. */
    return sessionCoins
}

/* Export module. */
export default getCoinsBySession
