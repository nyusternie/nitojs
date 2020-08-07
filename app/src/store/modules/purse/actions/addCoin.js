/**
 * Add Coin
 *
 * Adds new coin details to its respective session.
 */
const addCoin = ({ commit, getters }, _pkg) => {
    console.info('Adding new coin...', _pkg) // eslint-disable-line no-console

    /* Set session id. */
    const sessionid = _pkg.sessionid
    // console.log('ADD NEW COIN (sessionid):', sessionid)

    /* Set chain id. */
    const chainid = _pkg.chainid
    // console.log('ADD NEW COIN (chainid):', chainid)

    /* Set coin. */
    const coin = _pkg.coin
    // console.log('ADD NEW COIN (coin):', coin)

    /* Set sessions. */
    const sessions = getters.getSessions
    // console.log('ADD NEW COIN (sessions):', sessions)

    /* Validate session id. */
    if (!sessions[sessionid]) {
        return
    }

    /* Add coin to session. */
    sessions[sessionid].coins[`${coin.txid}:${coin.vout}`] = coin

    /* Increment deposit account. */
    switch(chainid) {
    case 0:
        /* Increment deposit index. */
        sessions[sessionid].accounts.deposit++
        break
    case 1:
        /* Increment change index. */
        sessions[sessionid].accounts.change++
        break
    case 7867:
        /* Commit Nito Cash index. */
        commit('setNitoCashIdx', getters.getNitoCashIdx + 1)
        break
    case 7888:
        /* Increment Nito Exchange index. */
        sessions[sessionid].accounts.xchg++
        break
    }

    /* Commit updated sessions. */
    commit('setSessions', sessions)
}

/* Export module. */
export default addCoin
