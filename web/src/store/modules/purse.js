/* Import modules (getters). */
import getAccountBySession from './purse/getters/getAccountBySession'
import getAccountsBySession from './purse/getters/getAccountsBySession'
import getBalance from './purse/getters/getBalance'
import getBalanceBySession from './purse/getters/getBalanceBySession'
import getCoinsBySession from './purse/getters/getCoinsBySession'
import getDerivationPath from './purse/getters/getDerivationPath'
import getDustAmount from './purse/getters/getDustAmount'
import getHDNode from './purse/getters/getHDNode'
// import getHistory from './purse/getters/getHistory'
import getMasterSeed from './purse/getters/getMasterSeed'
import getSessions from './purse/getters/getSessions'
// import getSignedInput from './purse/getters/getSignedInput'

/* Import modules (actions). */
import addCoin from './purse/actions/addCoin'
import createSession from './purse/actions/createSession'
import initPurse from './purse/actions/initPurse'
// import nextCoin from './purse/actions/nextCoin'
import rebuildPurse from './purse/actions/rebuildPurse'
// import sendCrypto from './purse/actions/sendCrypto'
import updateCoins from './purse/actions/updateCoins'

/* Import modules (mutations). */
import setEmptyPurse from './purse/mutations/setEmptyPurse'
import setMasterSeed from './purse/mutations/setMasterSeed'
import setSessions from './purse/mutations/setSessions'

/* Initialize state. */
const state = {
    /**
     * Master Seed
     *
     * A 32-byte key, used to secure the entire purse.
     */
    masterSeed: null,

    /**
     * Sessions
     *
     * Every new session is created on a separate derivation path.
     * The `session` chain is equivalent to the `account` chain.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<session>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     */
    sessions: null,
}

/* Getters. */
const getters = {
    getAccountBySession,
    getAccountsBySession,
    getBalance,
    getBalanceBySession,
    getCoinsBySession,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    // getHistory,
    getMasterSeed,
    getSessions,
    // getSignedInput,
}

/* Actions. */
const actions = {
    addCoin,
    createSession,
    initPurse,
    // nextCoin,
    rebuildPurse,
    // sendCrypto,
    updateCoins,
}

/* Mutations. */
const mutations = {
    setEmptyPurse,
    setMasterSeed,
    setSessions,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
