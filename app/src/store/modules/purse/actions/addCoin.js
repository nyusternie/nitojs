/**
 * Add Coin
 *
 * Adds new coin details to its respective session.
 */
const addCoin = ({ commit, getters }, _pkg) => {
    console.info('Adding new coin...', _pkg) // eslint-disable-line no-console

    /* Set session id. */
    const sessionId = _pkg.sessionId
    // console.log('ADD NEW COIN (sessionid):', sessionId)

    /* Set chain id. */
    const chainId = _pkg.chainId
    // console.log('ADD NEW COIN (chainid):', chainId)

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
    sessions[sessionId].coins[`${coin.txid}:${coin.vout}`] = coin

    /* Increment deposit account. */
    switch(chainId) {
    case 0:
        /* Increment deposit index. */
        sessions[sessionId].accounts.deposit++
        break
    case 1:
        /* Increment change index. */
        sessions[sessionId].accounts.change++
        break
    case 7867:
        /* Commit Nito Cash index. */
        commit('setNitoCashIdx', getters.getNitoCashIdx + 1)
        break
    case 7888:
        /* Increment Nito Exchange index. */
        sessions[sessionId].accounts.xchg++
        break
    }

    /* Commit updated sessions. */
    commit('setSessions', sessions)
}

/* Export module. */
export default addCoin
