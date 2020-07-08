/* Import modules. */
const debug = require('debug')('nitojs:account')
const EventEmitter = require('events').EventEmitter

/**
 * Account
 *
 * Hierarchically deterministic node which can be used to
 * perform coin, purse and/or wallet functions.
 *
 * Accounts may be initialized with various `seed` values:
 *   1. mnemonic phrase (12 - 24 words)
 *   2. entropy buffer (32-byte)
 *   3. seed buffer (64-byte)
 *   4. wallet import format (WIF)
 *   5. extended private key (xpriv)
 *   6. extended public key (xpub)
 *
 * NOTE: Derivation paths are initialized up to the account level.
 *       "Chain" and "Address" levels can either be manually specified or
 *       automatically derived when called from a method.
 */
class Account extends EventEmitter {
    constructor(_seed, _derivationPath) {
        super()

        /* Validate derivation path. */
        if (_derivationPath) {
            this.derivationPath = _derivationPath
        } else {
            // NOTE: Hardened account path.
            this.derivationPath = `m/44'/145'/0'`
        }

        /* Handle seed buffer. */
        // this.account = bch.HDPrivateKey.fromSeed(_seed)

        /* Handle mnemnonic phrase. */
        // this.account = Mnemonic(_seed).toHDPrivateKey()

        /* Handle WIF seed. */
        // this.account = fromWIF(_seed)

        /* Handle extended private key. */
        // this.account = fromXPriv

        // toWIF
        // toXPub
        // toXPriv
        // toKeyPair
        //

        debug(`Account class has been initialized by with [ ${_seed} ] at [ ${_derivationPath} ]`)
    }

    /**
     * Sign
     *
     * Sign 32 byte hash encoded as a buffer.
     */
    sign(_hash, _node) {
        return require('./sign')(_hash, _node)
    }

    /**
     * (Static) Sign
     *
     * Sign 32 byte hash encoded as a buffer.
     */
    static sign(_hash, _node) {
        return require('./sign')(_hash, _node)
    }

    /**
     * Verify
     *
     * Verify signed 32 byte hash encoded as a buffer.
     */
    verify(_hash, _publicKey, _signature) {
        return require('./verify')(_hash, _publicKey, _signature)
    }

    /**
     * (Static) Verify
     *
     * Verify signed 32 byte hash encoded as a buffer.
     */
    static verify(_hash, _publicKey, _signature) {
        return require('./verify')(_hash, _publicKey, _signature)
    }

}

/* Export module. */
module.exports = Account
