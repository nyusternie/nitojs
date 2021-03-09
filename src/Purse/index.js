/* Import modules. */
const Blockchain = require('../Blockchain')
const debug = require('debug')('nitojs:purse')
const EventEmitter = require('events').EventEmitter

/**
 * Purse Class
 *
 * A coin management system for creating custom wallets.
 *
 * Set the `sync` flag to enable/disable automatic (real-time) updates
 * from the blockchain.
 *
 * NOTE: Purse is recommended for advanced developers working with a single or
 * just a few Bitcoin addresses (as its instantiated from a WIF). Most
 * developers are encouraged to use the methods from the `Wallet` class.
 */
class Purse extends EventEmitter {
    constructor(_wif, _sync = true) {
        super()

        /* Initialize node. */
        this._node = null

        /* Validate WIF. */
        if (!_wif) {
            throw new Error('Wallet Import Format (WIF) is required to create a new Purse.')
        }

        /* Initialize node. */
        this._node = require('./fromWIF')(_wif)

        /* Initialize blockchain. */
        this._blockchain = null

        /* Initialize (cash) address. */
        this._cashAddress

        /* Initialize (legacy) address. */
        this._legacyAddress

        /* Initialize UTXOs. */
        this._utxos = []

        /* Validate LIVE sync flag. */
        if (_sync) {
            /* Set sync handler. */
            // this._syncHandler = setInterval(this.sync, 30)

            this.sync()
        }

        debug(`Purse class has been initialized from [ ${_wif} ]`)
    }

    /* Address */
    // NOTE: Alias for `cashAddress`.
    get address() {
        /* Return cash address. */
        return require('./cashAddress').bind(this)()
    }

    /* Balance */
    get balance() {
        /* Return (confirmed + unconfirmed) balance. */
        return 0
    }

    /* Cash Address */
    get cashAddress() {
        /* Return cash address. */
        return require('./cashAddress').bind(this)()
    }

    /* Confirmed */
    get confirmed() {
        /* Return (confirmed) balance. */
        return 0
    }

    /*  Legacy Address */
    get legacyAddress() {
        /* Return cash address. */
        return require('./legacyAddress').bind(this)()
    }

    /* Unconfirmed */
    get unconfirmed() {
        /* Return (unconfirmed) balance. */
        return 0
    }

    /* Unspent Transaction Outputs (UTXOs) */
    get utxos() {
        /* Return UTXOs. */
        return this._utxos
    }

    /**
     * To Address
     *
     * Retrieves the cash address for this node.
     */
    // toAddress() {
    //     if (!this._node) {
    //         return null
    //     }
    //
    //     /* Return address. */
    //     return this._node.toAddress()
    // }

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
        debug('Synchronizing purse...')
        console.log('ENABLE LIVE SYNC')

        /* Initialize Nito blockchain. */
        this._blockchain = new Blockchain()
        // console.log('NITO BLOCKCHAIN', this.blockchain)

        /* Subscribe for updates. */
        this._blockchain.subscribe('address', this.address)

        /* Handle blockchain updates. */
        this._blockchain.on('update', (_msg) => {
            const util = require('util')
            console.info('Blockchain update (msg):', util.inspect(_msg, false, null, true)) // eslint-disable-line no-console

            /* Set data. */
            const data = _msg.data

            /* Validate data. */
            if (!data) {
                throw new Error(`Invalid message data was returned from the blockchain. [ ${JSON.stringify(_msg)} ]`)
            } else if (data.length > 0) {
                /* Update coins. */
                require('./updateCoins').bind(this)(data)
            }
        })

        /* Update coins. */
        // FIXME: Why is this blocking the entire initial UI setup??
        // this.updateCoins()

    }
}

/* Export module. */
module.exports = Purse
