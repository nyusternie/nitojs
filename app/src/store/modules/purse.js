/* Import modules (getters). */
import getAccountBySessionid from './purse/getters/getAccountBySessionid'
import getActiveSessionid from './purse/getters/getActiveSessionid'
import getAddressBySessionid from './purse/getters/getAddressBySessionid'
import getBalance from './purse/getters/getBalance'
import getBalanceBySessionid from './purse/getters/getBalanceBySessionid'
import getCoinById from './purse/getters/getCoinById'
import getCoinsBySessionid from './purse/getters/getCoinsBySessionid'
import getDerivationPath from './purse/getters/getDerivationPath'
import getDustAmount from './purse/getters/getDustAmount'
import getHDNode from './purse/getters/getHDNode'
// import getHistory from './purse/getters/getHistory'
import getMasterSeed from './purse/getters/getMasterSeed'
import getMeta from './purse/getters/getMeta'
import getMnemonic from './purse/getters/getMnemonic'
import getNitoCashIdx from './purse/getters/getNitoCashIdx'
import getOutbox from './purse/getters/getOutbox'
import getSessions from './purse/getters/getSessions'

/* Import modules (actions). */
import addCoin from './purse/actions/addCoin'
import addSession from './purse/actions/addSession'
import initPurse from './purse/actions/initPurse'
import rebuildPurse from './purse/actions/rebuildPurse'
import updateCoins from './purse/actions/updateCoins'
import updateCoin from './purse/actions/updateCoin'
import updateMeta from './purse/actions/updateMeta'
import updateOutbox from './purse/actions/updateOutbox'

/* Import modules (mutations). */
import setActiveSessionid from './purse/mutations/setActiveSessionid'
import setEmptyPurse from './purse/mutations/setEmptyPurse'
import setMasterSeed from './purse/mutations/setMasterSeed'
import setMeta from './purse/mutations/setMeta'
import setNitoCashIdx from './purse/mutations/setNitoCashIdx'
import setOutbox from './purse/mutations/setOutbox'
import setSessions from './purse/mutations/setSessions'

/* Initialize state. */
const state = {
    /**
     * Active Session Id
     *
     * Most recently selected session's id.
     */
    activeSessionid: null,

    /**
     * Coins
     *
     * Manages coin info in an object:
     *   - status [ active | disabled | locked ]
     *   - txid
     *   - vout
     *   - satoshis
     *   - wif
     *   - cashAddress
     *   - legacyAddress
     */
    coins: null,

    /**
     * (Account) Indices
     *
     * Manages the indices of account addresses.
     */
    indices: null,

    /**
     * Master Seed
     *
     * A 32-byte key, used to secure the entire purse.
     */
    masterSeed: null,

    /**
     * Metadata
     */
    meta: null,

    /**
     * Nito Cash Index
     *
     * Manages a single `session` and `chain` for this wallet type.
     * eg. m/44'/145'/0'/7867/<index>
     *
     * NOTE: This is for better compatibility and portability with
     *       Nito-based wallets (eg. Nito.cash).
     */
    nitoCashIdx: null,

    /**
     * Coins waiting to be sent out from the purse.
     */
    outbox: null,

    /**
     * Sessions
     *
     * Every new session is created on a separate derivation path.
     * The `session` index is equivalent to the `account` level of BIP-32.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<session>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     */
    sessions: null,
}

/* Getters. */
const getters = {
    getAccountBySessionid,
    getActiveSessionid,
    getAddressBySessionid,
    getBalance,
    getCoinById,
    getBalanceBySessionid,
    getCoinsBySessionid,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    // getHistory,
    getMasterSeed,
    getMeta,
    getMnemonic,
    getNitoCashIdx,
    getOutbox,
    getSessions,
}

/* Actions. */
const actions = {
    addCoin,
    addSession,
    initPurse,
    rebuildPurse,
    updateCoins,
    updateCoin,
    updateMeta,
    updateOutbox,
}

/* Mutations. */
const mutations = {
    setActiveSessionid,
    setEmptyPurse,
    setMasterSeed,
    setMeta,
    setNitoCashIdx,
    setOutbox,
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
