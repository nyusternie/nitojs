/* Import modules. */
const debug = require('debug')('nitojs:wallet')
const EventEmitter = require('events').EventEmitter

/**
 * Wallet
 *
 * High level functions for simple crypto transactions.
 */
class Wallet extends EventEmitter {
    constructor(_params) {
        super()

        /* Initialize node. */
        this.node = null

        /* Initialize mnemonic. */
        this._mnemonic = null

        /* Initialize 32-byte seed. */
        this._seed = null

        /* Initialize wallet key. */
        this._walletKey = null

        /* Initialize derivation path. */
        this._derivationPath = null

        /* Initialize security level. */
        this._securityLevel = null

        /* Initialize mapped keys. */
        this._mappedKeys = null

        /* Initialize required number of signatures. */
        this._numSigs = null

        /* Initialize coins. */
        this._coins = null

        /* Initialize indices. */
        this._indices = null

        /* Validate wallet key. */
        if (_params.key) {
            this._walletKey = _params.key
        } else {
            this._walletKey = _params
        }

        /* Validate derivation path. */
        if (_params.path) {
            this._derivationPath = _params.path
        } else {
            // NOTE: Hardened account path.
            this._derivationPath = `m/44'/145'/0'`
        }

        /* Validate security. */
        if (_params.security) {
            this._securityLevel = _params.security
        } else {
            this._securityLevel = 24 // NOTE: 12 = 128-bit, 24 = 256-bit
        }

        /* Validate mapped keys. */
        if (_params.mappedKeys) {
            this._mappedKeys = _params.mappedKeys
        }

        /* Validate required number of signatures. */
        if (_params.numSigs) {
            this._numSigs = _params.numSigs
        }

        debug(`Wallet class has been initialized by with [ ${this._walletKey} ] at [ ${this._derivationPath} ] with [ ${this.security} ]`)

        /* Initialize accounts. */
        this._accounts = []

        /* Initialize (default) account. */
        this._accounts[0] = this.createAccount()
    }

    /* Accounts */
    get accounts() {
        return this._accounts
    }

    /* Add Account */
    // FIXME: Remove `createAccount`.
    addAccount(_path) {
        return require('./addAccount').bind(this)(_path)
    }

    /* Create Account */
    // FIXME: Remove `addAccount`.
    createAccount() {
        return require('./createAccount').bind(this)()
    }

}

/* Export module. */
module.exports = Wallet
