/**
 * Add New Coin
 */
const addCoin = ({ commit, getters }, _pkg) => {
    console.info('Adding new coin...', _pkg)

    /* Set session id. */
    const sessionId = _pkg.sessionId
    // console.log('ADD NEW COIN (sessionid):', sessionId)

    /* Set coin. */
    const coin = _pkg.coin
    // console.log('ADD NEW COIN (coin):', coin)

    /* Set sessions. */
    const sessions = getters.getSessions
    // console.log('ADD NEW COIN (sessions):', sessions)

    /* Validate session id. */
    if (!sessions[sessionId]) {
        return
    }

    /* Add coin to session. */
    sessions[sessionId].coins[coin.txid] = coin

    /* Increment deposit account. */
    sessions[sessionId].accounts.deposit++

    /* Commit updated sessions. */
    commit('setSessions', sessions)
}

/* Export module. */
export default addCoin
