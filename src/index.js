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

    /* Account */
    get Account() {
        return require('./Account')
    }

    /* (Static) Account */
    static get Account() {
        return require('./Account')
    }

    /* Address */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Address() {
        return require('./Address')
    }

    /* Blockchain */
    get Blockchain() {
        return require('./Blockchain')
    }

    /* (Static) Blockchain */
    static get Blockchain() {
        return require('./Blockchain')
    }

    /* (Static) Crypto */
    static get Crypto() {
        return require('./Crypto')
    }

    /* Markets */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Markets() {
        return require('./Markets')
    }

    /* Message */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Message() {
        return require('./Message')
    }

    /* Privacy */
    get Privacy() {
        return require('./Privacy')
    }

    /* (Static) Privacy */
    static get Privacy() {
        return require('./Privacy')
    }

    /* Purse */
    get Purse() {
        return require('./Purse')
    }

    /* (Static) Purse */
    static get Purse() {
        return require('./Purse')
    }

    /* Transaction */
    get Transaction() {
        return require('./Transaction')
    }

    /* (Static) Transaction */
    static get Transaction() {
        return require('./Transaction')
    }

    /* (Static) Utilities */
    static get Utils() {
        return require('./Utils')
    }

}

/* Export module. */
module.exports = Nito
