const debug = require('debug')('nitojs:wallet')
const EventEmitter = require('events').EventEmitter

/**
 * Wallet Class
 *
 * Provides a complete (mutli-currency) wallet.
 */
class Wallet extends EventEmitter {
    constructor() {
        super()
    }

    init(_auth) {
        debug('Initializing wallet...')
        debug('Authorization:', _auth)
    }

    /**
     * Synchronize
     *
     * The synchronizer keeps the wallet up-to-date with its set of
     * addresses and their transactions.  It subscribes over the network
     * to wallet addresses, gets the wallet to generate new addresses
     * when necessary, requests the transaction history of any addresses
     * we don't have the full history of, and requests binary transaction
     * data of any transactions the wallet doesn't have.
     */
    sync() {
        debug('Synchronizing wallet...')
    }
}

/* Export module. */
module.exports = Wallet
