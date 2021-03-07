/* Import modules. */
const debug = require('debug')('nitojs:purse')
const EventEmitter = require('events').EventEmitter

/**
 * Purse Class
 *
 * A coin management system for creating custom wallets.
 *
 * NOTE: The `Purse` can ONLY accepts a WIF (private key) during instantiation.
 *       This class is reserved for advanced use ONLY. Most developers should
 *       make use of methods from the `Wallet` class.
 */
class Purse extends EventEmitter {
    constructor(_wif) {
        super()

        /* Initialize node. */
        this.node = null

        /* Validate WIF. */
        if (!_wif) {
            throw new Error('Wallet Import Format (WIF) is required to create a new Purse.')
        }

        /* Initialize node. */
        this.node = require('./fromWIF')(_wif)

        debug(`Purse class has been initialized from [ ${_wif} ].`)
    }

    /**
     * Cash Address
     *
     *
     */
    get cashAddress() {
        /* Return cash address. */
        return require('./cashAddress').bind(this)()
    }
    get address() {
        /* Return cash address. */
        return require('./cashAddress').bind(this)()
    }

    /**
     * Legacy Address
     *
     * Retrieves the legacy address for this node.
     */
    get legacyAddress() {
        /* Return cash address. */
        return require('./legacyAddress').bind(this)()
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
