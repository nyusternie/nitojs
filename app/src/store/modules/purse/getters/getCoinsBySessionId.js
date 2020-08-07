/**
 * Get Coins by Session Id
 *
 * Returns UTXOs for ALL (in-use) session coins.
 */
const getCoinsBySessionId = (state, getters) => (_sessionid) => {
    // console.log('GET COINS BY SESSION (sessionid)', _sessionid)
    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    // console.log('GET COINS BY SESSION (sessions)', sessions)

    /* Validate session. */
    if (!sessions[_sessionid]) {
        return null
    }

    /* Initialize (session) coins. */
    const coins = sessions[_sessionid].coins

    /* Return (session) coins. */
    return coins
}

/* Export module. */
export default getCoinsBySessionId
