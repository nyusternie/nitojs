/* Import modules. */
const debug = require('debug')('nitojs:wallet')
const EventEmitter = require('events').EventEmitter

/**
 * Wallet
 *
 * High level functions for simple crypto transactions.
 */
class Wallet extends EventEmitter {
    constructor(_seed, _derivationPath) {
        super()

        /* Validate derivation path. */
        if (_derivationPath) {
            this.derivationPath = _derivationPath
        } else {
            // NOTE: Hardened account path.
            this.derivationPath = `m/44'/145'/0'`
        }

        debug(`Wallet class has been initialized by with [ ${_seed} ] at [ ${_derivationPath} ]`)
    }

}

/* Export module. */
module.exports = Wallet
