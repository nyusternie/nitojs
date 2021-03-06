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

    /* (Static) Account */
    static get Account() {
        return require('./Account')
    }

    /* (Static) Address */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Address() {
        return require('./Address')
    }

    /* (Static) Application */
    static get App() {
        return require('./App')
    }

    /* (Static) Blender */
    static get Blender() {
        return require('./Blender')
    }

    /* (Static) Blockchain */
    static get Blockchain() {
        return require('./Blockchain')
    }

    /* (Static) Crypto */
    static get Crypto() {
        return require('./Crypto')
    }

    /* (Static) Markets */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Markets() {
        return require('./Markets')
    }

    /* (Static) Message */
    // NOTE: This class is read-only and ONLY supports static methods.
    static get Message() {
        return require('./Message')
    }

    /* (Static) Privacy */
    static get Privacy() {
        return require('./Privacy')
    }

    /* (Static) Purse */
    static get Purse() {
        return require('./Purse')
    }

    /* (Static) Script */
    static get Script() {
        return require('./Script')
    }

    /* (Static) SLP */
    static get SLP() {
        return require('./SLP')
    }

    /* (Static) Transaction */
    static get Transaction() {
        return require('./Transaction')
    }

    /* (Static) Utilities */
    static get Utils() {
        return require('./Utils')
    }

    /* (Static) Wallet */
    static get Wallet() {
        return require('./Wallet')
    }

}

/* Export module. */
module.exports = Nito
