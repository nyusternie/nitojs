/* Import core modules. */
const debug = require('debug')('nitojs:blender')
const EventEmitter = require('events').EventEmitter

// const ShuffleRound = require('./BlenderRound.js')
// const coinUtils = require('./coinUtils.js')

/**
 * Blender (Class)
 */
class Blender extends EventEmitter {
    constructor (clientOptions) {
        super()

        debug('Blender Client (options):', clientOptions)

        /* Add client options to instance. */
        // for (let oneOption in clientOptions) {
        //     this[oneOption] = clientOptions[oneOption]
        // }

        /* Set maximum shuffle rounds. */
        // this.maxShuffleRounds = this.maxShuffleRounds || 5

        /* Set coins. */
        // this.coins = this.coins && this.coins.length ? this.coins : []

        /* Initialize coins to populate. */
        // NOTE: Will add the necessary properties to the coins, so the
        //       shuffle libraries can use them.
        // const coinsToPopulate = []

        /* Loop through ALL coins. */
        // while (this.coins.length) {
        //     coinsToPopulate.push(this.coins.pop())
        // }
        // debug('Shuffle Client (coinsToPopulate):', coinsToPopulate)

        /* Initialize hooks. */
        // this.hooks = this.hooks || {}

        /* Validate change hooks. */
        // if (!_.isFunction(this.hooks.change)) {
        //     console.error(`A valid change generation hook was not provided!`) // eslint-disable-line no-console
        //     throw new Error('BAD_CHANGE_FN')
        // }

        /* Validate shuffled hooks. */
        // if (!_.isFunction(this.hooks.shuffled)) {
        //     console.error(`A valid shuffle address generation hook was not provided!`) // eslint-disable-line no-console
        //     throw new Error('BAD_SHUFFLE_FN')
        // }

        /* Add unshuffled coins. */
        // this.addUnshuffledCoins(
        //     _.orderBy(coinsToPopulate, ['satoshis'], ['desc']))

        /* Initialize rounds. */
        this.rounds = []

        /* Initialize shuffled. */
        this.shuffled = []

        /* Initialize skipped. */
        this.skipped = []

        /* Initialize shuffling flag. */
        this.isShuffling = false

        // TODO: Add option to prioritize coin selection to either
        //       minimize coins vs maximize shuffle speed.
        // this.shufflePriority = this.shufflePriority ? this.shufflePriority : 'amount';

        // this.statsIntervalId

        /* Initialize server statistics. */
        // NOTE: Server Stats fetched from the `/stats` endpoint.
        this.serverStats = {}

        /* Initialize server back-off (milliseconds). */
        // NOTE: If we every try and fail to reach the server, this number
        //       will be populated with the amount of time the client will
        //       wait in between reconnection attempts.
        this.serverBackoffMs = 0

        /* Set the shuffle fee (in satoshis). */
        this.shuffleFee = 270

        /**
         * Server Pool Amounts
         *
         * (estiamting fiat USD value @ $250.00)
         *
         * Minimum fee amount of 1,000 satoshis (~$0.0025)
         *
         * NOTE: Dust amount is 546 satoshis (~$0.001365)
         */
        this.serverPoolAmounts = [
            100000000000, // 1000.0 BCH ($250,000.00)
            10000000000, // 100.0 BCH ($25,000.00)
            1000000000, // 10.0 BCH ($2,500.00)
            100000000, // 1.0 BCH ($250.00)
            10000000, // 0.1 BCH ($25.00)
            1000000, // 0.01 BCH ($2.50)
            100000, // 0.001 BCH ($0.25)
            10000 // 0.0001 BCH ($0.025)
        ]

        /* Initialize lost server connection flag. */
        // NOTE: This flag gets set to true if the server becomes unreachable
        //       after we've started shuffling.  We will use it in our
        //       auto-reconnect logic.
        this.lostServerConnection = false

        /**
         * Check Statistics Interval
         *
         * This is the actual function that is called by setInterval every
         * 5 seconds.  It also enforces server back-off for a persistent
         * lost connection.
         */
        // this.checkStatsIntervalFn = async () => {
        //     this
        //         .updateServerStats()
        //         .then(async () => {
        //             debug('Updated server statistics.')
        //
        //             /* Validate (auto) shuffle status. */
        //             if (!this.disableAutoShuffle || this.isShuffling) {
        //                 /* Set shuffling flag. */
        //                 this.isShuffling = true
        //
        //                 /* Validate server connection. */
        //                 if (!this.lostServerConnection) {
        //                     /* Start shuffling. */
        //                     this.shuffle()
        //                 }
        //             }
        //
        //             /* Set lost server connection flag. */
        //             this.lostServerConnection = false
        //         })
        //         .catch(async (error) => {
        //             if (error) {
        //                 return console.error(error) // eslint-disable-line no-console
        //             }
        //
        //             /* Clear (interval) timer. */
        //             clearInterval(this.tingId)
        //             debug(`No server. Waiting ${Math.floor(this.serverBackoffMs / 1000)} seconds before reconnecting`)
        //
        //             /* Delay execution. */
        //             await delay(this.serverBackoffMs)
        //
        //             /* Set server statistics interval. */
        //             this.setServerStatsInterval()
        //         })
        // }

        /**
         * Set Server Statistics Interval
         *
         * Re-fetch the server stats every 5 seconds, so we can make an
         * informed decision about which pools to join!
         */
        // this.setServerStatsInterval = async () => {
        //     /* Set (delay) interval. */
        //     this.tingId = setInterval(this.checkStatsIntervalFn, DELAY_IN_MS)
        //
        //     /* Check statistics interval. */
        //     this.checkStatsIntervalFn()
        // }

        /* Set server statistics interval. */
        // this.setServerStatsInterval()

        return this
    }

    /* Transaction and Signature */
    txAndSignature(_options) {
        return require('./getTxAndSignature')(_options)
    }

    /* Start (New Request) */
    start(_coin) {
        return require('./start')(_coin)
    }

    /* Shuffle */
    shuffle(_coin) {
        return require('./shuffle')(_coin)
    }

    /* Stop */
    stop(_coin) {
        return require('./stop')(_coin)
    }
}

module.exports = Blender
