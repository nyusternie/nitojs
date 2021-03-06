/* Import modules. */
const debug = require('debug')('nitojs:purse')
const EventEmitter = require('events').EventEmitter

/**
 * Purse Class
 *
 * A coin management system that can be used for creating custom wallets.
 */
class Purse extends EventEmitter {
    constructor(_wif) {
        super()

        /* Initialize node. */
        this.node = null

        /* Validate WIF. */
        if (_wif) {
            this.node = require('./fromWIF')(_wif)
        }

        debug(`Purse class has been initialized from [ ${_wif} ].`)
    }

    init(_auth) {
        debug('Initializing wallet...')
        debug('Authorization:', _auth)
    }

    /**
     * To Address
     *
     * Retrieves the cash address for this node.
     */
    toAddress() {
        if (!this.node) {
            return null
        }

        /* Return address. */
        return this.node.toAddress()
    }

    /**
     * To String
     *
     * Retrieves the cash address for this node.
     *
     * NOTE: Displays in ascii format.
     */
    toString() {
        return this.toAddress().toString()
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
module.exports = Purse
