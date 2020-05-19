/**
 * Update Coins
 */
const updateCoins = ({ commit, getters }, _params) => {
    console.info('Updating coins...', _params)

    /* Set purse. */
    const purse = _params.purse
    console.log('PURSE', purse)

    /* Set (account) action. */
    const action = _params.action
    console.log('ACCOUNT ACTION', action)

    /* Set (account) indexes. */
    const indexes = _params.indexes
    console.log('ACCOUNT INDEXES', indexes)

    /* Retreive coins. */
    const coins = getters.getCoins
    console.log('ALL COINS', coins)

    /* Retrieve purse coins. */
    const purseCoins = getters.getCoinsByWallet(purse)
    console.log('PURSE COINS', purseCoins)

    /* Disable applicable account indexes. */
    // FIXME: Do we verify here, OR in `sendCrypto`??
    indexes.forEach(index =>  {
        switch(action) {
        case 'activate':
            purseCoins[index].s = 'a'
            break
        case 'disable':
            purseCoins[index].s = 'd'
            break
        case 'lock':
            purseCoins[index].s = 'l'
            break
        }
    })

    /* Update coins. */
    coins[purse] = purseCoins

    /* Commit updated coins. */
    commit('setCoins', coins)
}

/* Export module. */
export default updateCoins
