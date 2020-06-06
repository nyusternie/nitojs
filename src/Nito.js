/* Import modules. */
const debug = require('debug')('nitojs')
const EventEmitter = require('events').EventEmitter

/**
 * Nito
 *
 * Main class for the NitoJS anonymity manager.
 */
class Nito extends EventEmitter {
    constructor() {
        /* Initialize NitoJS class. */
        debug('Initializing NitoJS...')
        super()

        /* Initialize wallet. */
        this.wallet = null

        /* Initialize shuffle manager. */
        this.shuffleManager = null

    }

    test() {
        this.emit('test', 'hi there!')
    }

    /**
     * Status
     *
     * Display a status report for the server.
     */
    status() {
        /* Initialize statuses. */
        const statuses = [{
            id: -1,
            message: 'error'
        }, {
            id: 0,
            message: 'unknown'
        }, {
            id: 1,
            message: 'ok'
        }]

        /* Set current status. */
        const currentStatus = statuses[2]

        /* Return current status. */
        return currentStatus
    }

    /**
     * Connect
     *
     * Create IPFS Orbit DB connection.
     */
    connect() {
        debug('ADD CONNECTION')

        return 1
    }

    /**
     * Disconnect
     *
     * Terminate IPFS Orbit DB connection.
     */
    disconnect() {
        debug('DISCONNECT')

        return 0
    }

    /* Blockchain */
    get Blockchain() {
        return require('./Blockchain')
    }

    /* (Static) Blockchain */
    static get Blockchain() {
        return require('./Blockchain')
    }

    /* Markets */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Markets() {
        return require('./Markets')
    }

    /* Privacy */
    get Privacy() {
        return require('./Privacy')
    }

    /* (Static) Privacy */
    static get Privacy() {
        return require('./Privacy')
    }

    /* Transaction */
    get Transaction() {
        return require('./Transaction')
    }

    /* (Static) Transaction */
    static get Transaction() {
        return require('./Transaction')
    }

    /* Wallet */
    get Wallet() {
        return require('./Wallet')
    }

    /* (Static) Wallet */
    static get Wallet() {
        return require('./Wallet')
    }

}

/* Export module. */
module.exports = Nito
