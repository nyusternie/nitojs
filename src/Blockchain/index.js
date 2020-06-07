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

    /* Subscribe */
    subscribe(_type, _params) {
        /* Handle subscription type. */
        switch(_type) {
        case 'account':
            throw new Error('Account subscriptions are currently unavailable.')
        case 'address':
            /* Initialize Insomnia. */
            // NOTE: Returns an instance of Insomnia (for event monitoring).
            return new this.Insomnia().watchAddress(_params)
        case 'block':
            throw new Error('Block subscriptions are currently unavailable.')
        default:
            throw new Error('Unknown subscription type.')
        }
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
        return require('./insomnia')
    }

    /* (Static) Insomnia */
    static get Insomnia() {
        return require('./insomnia')
    }

    /* BitDB Query */
    get Query() {
        return require('./query')
    }

    /* (Static) BitDB Query */
    static get Query() {
        return require('./query')
    }

    /* BitDB Socket */
    get Socket() {
        return require('./socket')
    }

    /* Utilities */
    static get Utils() {
        return require('./utils')
    }

}

/* Export module. */
module.exports = Blockchain
