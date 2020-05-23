const debug = require('debug')('main')
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

        /* Initialize shuffle client. */
        this.shuffleClient = require('./libs/cashshuffle/ShuffleClient.js')

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

    /**
     * Get Shuffle Manager
     *
     * Starts the shuffle manager with an attached shuffle client,
     * providing the following:
     *    1. Coin: Nito Wallet Format (NWF).
     *    2. Change (address) generator function.
     *    3. Target (address) generator function.
     */
    startShuffleManager(_coin, _changeFunc, _targetFunc) {
        this.shuffleManager = new this.shuffleClient({
            coins: [ _coin ],

            hooks: {
                change: _changeFunc, // NOTE: This is a function.
                shuffled: _targetFunc, // NOTE: This is a function.
            },

            protocolVersion: 300,

            maxShuffleRounds: 1,

            // Disable automatically joining shuffle rounds
            // once a connection with the server is established
            disableAutoShuffle: false,

            serverStatsUri: 'https://shuffle.servo.cash:8080/stats'
            // serverStatsUri: 'https://cashshuffle.c3-soft.com:9999/stats'
        })

        /* Handle phase change messages. */
        this.shuffleManager.on('phase', async (_phase) => {
            this.emit('phase', _phase)
        })

        /* Handle notices. */
        this.shuffleManager.on('notice', async (_notice) => {
            /* Emit notice. */
            this.emit('notice', _notice)
        })

        /* Return shuffle manager. */
        // return this.shuffleManager
    }


}

/* Export module. */
module.exports = Nito
