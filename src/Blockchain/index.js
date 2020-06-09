/* Import modules. */
const debug = require('debug')('nitojs:blockchain')
const EventEmitter = require('events').EventEmitter

/**
 * Blockchain Class
 */
class Blockchain extends EventEmitter {
    constructor(_symbol = 'BCH', _network = 'mainnet') {
        super()

        /* Set symbol. */
        this.symbol = _symbol

        /* Set network. */
        this.network = _network

        /* Initialize Insomnia. */
        this.insomnia = null

        debug(`Blockchain class has been initialized for [ ${_symbol} ] on [ ${_network} ]`)
    }

    /* Broadcast Transaction */
    // NOTE: Returns a promise.
    static broadcast(_rawTx) {
        return this.Insomnia.broadcast(_rawTx)
    }

    /* Estimate Fee */
    static estimateFee(_symbol) {
        debug('Reqeusting fee estimate for:', _symbol)
        // FIXME: Add proper support for BCH and ETH.
        return 1.1 // measured in (fractional) satoshis
    }

    /* Get Block Height */
    // NOTE: Returns a promise.
    static getBlockHeight() {
        return this.Query.getBlockHeight()
    }

    /* Stop */
    stop() {
        /* Validate Insomnia. */
        if (this.insomnia) {
            /* Stop all processes. */
            this.insomnia.stop()
        }

        debug('Blockchain has been stopped.')
        console.log('Blockchain has been stopped.')
    }

    /* Subscribe */
    subscribe(_type, _params) {
        /* Handle subscription type. */
        switch(_type) {
        case 'account':
            throw new Error('Account subscriptions are currently unavailable.')
        case 'address': {
            if (!this.insomnia) {
                /* Initialize Insomnia. */
                this.insomnia = new this.Insomnia()

                /* Relay emit. */
                this.insomnia.on('update', (_msg) => this.emit('update', _msg))
            }

            /* Return response. */
            return this.insomnia.watchAddress(_params)
        }
        case 'block':
            throw new Error('Block subscriptions are currently unavailable.')
        default:
            throw new Error('Unknown subscription type.')
        }
    }

    /* Unsubscribe */
    unsubscribe(_type, _params) {
        debug('TODO: Unsubscribe', _type, _params)
    }

    /***************************************************************************
     *
     * Blockchain Class - Core Modules
     * -------------------------------
     *
     *   1. Insomnia
     *   2. Query
     *   3. Socket
     *   4. Utilities
     */

    /* Insomnia */
    get Insomnia() {
        return require('./Insomnia')
    }

    /* (Static) Insomnia */
    static get Insomnia() {
        return require('./Insomnia')
    }

    /* BitDB Query */
    get Query() {
        return require('./Query')
    }

    /* (Static) BitDB Query */
    static get Query() {
        return require('./Query')
    }

    /* BitDB Socket */
    get Socket() {
        return require('./Socket')
    }

    /* Utilities */
    static get Utils() {
        return require('./Utils')
    }

}

/* Export module. */
module.exports = Blockchain
