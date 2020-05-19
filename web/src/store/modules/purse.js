/* Import modules (getters). */
import getAddress from './purse/getters/getAddress'
import getAddresses from './purse/getters/getAddresses'
import getBalance from './purse/getters/getBalance'
import getCoins from './purse/getters/getCoins'
import getCoinsBySession from './purse/getters/getCoinsBySession'
import getDerivationPath from './purse/getters/getDerivationPath'
import getDustAmount from './purse/getters/getDustAmount'
import getHDNode from './purse/getters/getHDNode'
// import getHistory from './purse/getters/getHistory'
import getMasterSeed from './purse/getters/getMasterSeed'
import getSessions from './purse/getters/getSessions'
// import getSignedInput from './purse/getters/getSignedInput'

/* Import modules (actions). */
import createSession from './purse/actions/createSession'
import destroyPurse from './purse/actions/destroyPurse'
import initPurse from './purse/actions/initPurse'
// import nextCoin from './purse/actions/nextCoin'
// import sendCrypto from './purse/actions/sendCrypto'
// import updateCoin from './purse/actions/updateCoin'
// import updateInputs from './purse/actions/updateInputs'

/* Import modules (mutations). */
import setCoins from './purse/mutations/setCoins'
import setEmptyPurse from './purse/mutations/setEmptyPurse'
import setMasterSeed from './purse/mutations/setMasterSeed'
import setSessions from './purse/mutations/setSessions'

/* Initialize state. */
const state = {
    /**
     * Coins
     *
     * These are individual UTXOs used for CashShuffle inputs.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<purse>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     *
     * The <index> is used to generate a sufficient number of addresses,
     * needed to perform a high number of shuffles, eventually leading down
     * to the unspendable "dust" amount (aka "toxic waste").
     */
    coins: null,

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
     * The `purse` chain is equivalent to the `account` chain.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<purse>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     */
    sessions: null,
}

/* Getters. */
const getters = {
    getCoins,
    getCoinsBySession,
    getAddress,
    getAddresses,
    getBalance,
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
    createSession,
    destroyPurse,
    initPurse,
    // nextCoin,
    // sendCrypto,
    // updateCoin,
    // updateInputs,
}

/* Mutations. */
const mutations = {
    setCoins,
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
