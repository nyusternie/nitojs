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

    /* Set coin. */
    const coin = _pkg.coin
    // console.log('ADD NEW COIN (coin):', coin)

    /* Set chain id. */
    const chainid = coin.chainid
    // console.log('ADD NEW COIN (chainid):', chainid)

    /* Set sessions. */
    const sessions = getters.getSessions
    // console.log('ADD NEW COIN (sessions):', sessions)

    /* Validate session id. */
    if (!sessions[sessionid]) {
        return
    }

    /* Set coin id. */
    const coinid = `${coin.txid}:${coin.vout}`

    /* Add coin to session. */
    sessions[sessionid].coins[coinid] = coin

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

    try {
        /* Initialize coins. */
        const coins = new Audio(require('@/assets/audio/coins.wav'))

        /* Play coins. */
        // WARNING: This action may fail on several browsers;
        //          so it's best to do this last to avoid any
        //          unforseen side-effects.
        coins.play()
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
    }
}

/* Export module. */
export default addCoin
