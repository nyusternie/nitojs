/* Import modules (getters). */
// import getCoins from './purse/getters/getCoins'
// import getCoinsByWallet from './purse/getters/getCoinsByWallet'
// import getAddress from './purse/getters/getAddress'
// import getAddresses from './purse/getters/getAddresses'
// import getBalance from './purse/getters/getBalance'
// import getChangeAddress from './purse/getters/getChangeAddress'
// import getDerivationPath from './purse/getters/getDerivationPath'
// import getDustAmount from './purse/getters/getDustAmount'
// import getHDNode from './purse/getters/getHDNode'
// import getHistory from './purse/getters/getHistory'
// import getSignedInput from './purse/getters/getSignedInput'

/* Import modules (actions). */
// import activateAccounts from './purse/actions/activateAccounts'
// import activateInputs from './purse/actions/activateInputs'
// import addImportedSeed from './purse/actions/addImportedSeed'
// import createWallet from './purse/actions/createWallet'
import destroyPurse from './purse/actions/destroyPurse'
import initPurse from './purse/actions/initPurse'
// import nextAccount from './purse/actions/nextAccount'
// import sendCrypto from './purse/actions/sendCrypto'
// import updateAccounts from './purse/actions/updateAccounts'
// import updateInputs from './purse/actions/updateInputs'

/* Import modules (mutations). */
// import setCoins from './purse/mutations/setCoins'
import setEmptyPurse from './purse/mutations/setEmptyPurse'
import setMasterSeed from './purse/mutations/setMasterSeed'

/* Initialize state. */
const state = {
    /**
     * Coins
     *
     * These are individual UTXOs used for CashShuffle inputs.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/0'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     *
     * The <index> is used to generate the sufficient addresses needed to
     * perform multiple shuffles, down to the unspendable "dust" amount,
     * aka "toxic waste".
     */
    coins: null,

    /**
     * Master Seed
     *
     * A 32-byte key, used to secure the entire purse.
     */
    masterSeed: null,

    /**
     * Purses (aka Wallets)
     *
     * Every new session is created on a separate derivation path. However,
     * the `purse` chain is equivalent to `account` chain.
     *
     * A standard BCH derivation path is used,
     *     m/44'/145'/<purse>'/0/<index>
     * to allow for convenience and portability to desktop and mobile wallets.
     */
    purses: null,
}

/* Getters. */
const getters = {
    // getCoins,
    // getCoinsByWallet,
    // getAddress,
    // getAddresses,
    // getBalance,
    // getChangeAddress,
    // getDerivationPath,
    // getDustAmount,
    // getHDNode,
    // getHistory,
    // getSignedInput,
}

/* Actions. */
const actions = {
    // activateAccounts,
    // activateInputs,
    // addImportedSeed,
    // createWallet,
    destroyPurse,
    initPurse,
    // nextAccount,
    // sendCrypto,
    // updateAccounts,
    // updateInputs,
}

/* Mutations. */
const mutations = {
    // setCoins,
    setEmptyPurse,
    setMasterSeed,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
