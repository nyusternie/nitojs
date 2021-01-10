/**
 * Get Coin by Id
 *
 * Returns the full coin details.
 */
const getCoinById = (state, getters) => (_coinid) => {
    /* Set coin id. */
    const coinid = _coinid
    console.log('GET COIN BY ID (coinid)', coinid)

    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    console.log('GET COIN BY ID (sessions):', sessions)

    /* Initialize coin. */
    let coin = null

    Object.keys(sessions).forEach(_sessionid => {
        /* Validate coin. */
        if (coin) return

        /* Set session. */
        const session = sessions[_sessionid]

        /* Set coins. */
        const coins = session.coins

        Object.keys(coins).forEach(_coinid => {
            /* Validate coin. */
            if (coin) return

            if (_coinid === coinid) {
                coin = coins[_coinid]
            }
        })
    })

    /* Return account. */
    return coin
}

/* Export module. */
export default getCoinById
