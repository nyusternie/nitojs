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

    /* Create Account */
    createAccount(_params) {
        return require('./createAccount').bind(this)(_params)
    }

}

/* Export module. */
module.exports = Wallet
