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

        /* Initialize Socket. */
        this.socket = null

        debug(`Blockchain class has been initialized for [ ${_symbol} ] on [ ${_network} ]`)
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

    /* Is Spent */
    // NOTE: Returns a promise.
    static isSpent(_txid, _vout) {
        return this.Query.isSpent(_txid, _vout)
    }

    /* Subscribe */
    subscribe(_type, _params) {
        /* Handle subscription type. */
        switch(_type) {
        case 'account':
            throw new Error('Account subscriptions are currently unavailable.')
        case 'address': {
            if (!this.socket) {
                /* Initialize Socket. */
                this.socket = new this.Socket()

                /* Relay emit. */
                this.socket.on('update', (_msg) => this.emit('update', _msg))
            }

            /* Return response. */
            return this.socket.watchAddress(_params)
        }
        case 'block':
            throw new Error('Block subscriptions are currently unavailable.')
        default:
            throw new Error('Unknown subscription type.')
        }
    }

    /* Unsubscribe */
    // FIXME: Handle the 2 parameters to limit the scope of the unsubscription.
    unsubscribe(_type, _params) {
        console.log(`FIXME: Unsubscribe from ${_type} for ${_params}`)

        /* Validate Insomnia. */
        if (this.socket) {
            /* Close the socket connection. */
            this.socket.close()
        }

        debug('Socket has been closed.')
        console.log('Socket has been closed.')
    }

    /***************************************************************************
     *
     * Blockchain Class - Core Modules
     * -------------------------------
     *
     *   1. Files
     *   2. Insomnia
     *   3. Query
     *   4. Socket
     */

     /* Files */
     get Files() {
         return require('./Files')
     }

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

}

/* Export module. */
module.exports = Blockchain
