const debug = require('debug')('main')

/**
 * Nito
 */
class Nito {
    constructor() {
        debug('Initializing module...')
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

}

/* Export module. */
module.exports = Nito
