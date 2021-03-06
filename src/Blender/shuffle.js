/* Import modules. */
const debug = require('debug')('nitojs:blender:shuffle')

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/* Set delay (in milliseconds). */
const DELAY_IN_MS = 5000

/**
 * Shuffle
 */
const shuffle = async () => {
    /* Validate shuffling status. */
    while (this.isShuffling) {
        // If we have a connection error, wait a while
        // then try again.  Don't exit this loop.
        if (!this.serverBackoffMs) {
            if (this.coins.length && this.rounds.length < this.maxShuffleRounds) {
                // Here we can add logic that considers this client's
                // `maxShuffleRounds` param when selecting a coin to
                // shuffle.

                /* Set coin to shuffle. */
                // NOTE: Find max coin value.
                const coinToShuffle = this.coins
                    .reduce((a, b) => {
                        return a.satoshis >= b.satoshis ? a : b
                    }, {})

                /* Determine the pools this coin is eligible for. */
                // const eligiblePools = _.partition(this.serverPoolAmounts, (onePoolAmount) => {
                //     /* Set amount after fee. */
                //     const amountAfterFee = coinToShuffle.satoshis - this.shuffleFee
                //
                //     /* Validate eligibility. */
                //     return amountAfterFee >= onePoolAmount
                // })[0]

                /* Validate eligibility. */
                // NOTE: If the value of the coin is less than the lowest
                //       pool size on this server, deem it unshufflable.
                // if (!eligiblePools.length) {
                //     this.skipCoin(coinToShuffle)
                //
                //     this.emit('skipped', Object.assign(coinToShuffle, {
                //         error: 'dust'
                //     }))
                //
                //     continue
                // }

                /* Get a list of the pools in which we have an active shuffle round. */
                // const poolsInUse = this.rounds
                //     .filter({ done: false })
                //     .map(obj => obj['poolAmount'])

                /* Remove any pool that we have an active round in. */
                // const poolsWeCanUse = _.difference(eligiblePools, poolsInUse)

                /* Set eligible pools with players. */
                // const eligiblePoolsWithPlayers = _.intersection(poolsWeCanUse, this.serverStats.pools.map(obj => obj['amount']))

                /* Set pool to use. */
                // const poolToUse = _.max(eligiblePoolsWithPlayers.length ? eligiblePoolsWithPlayers : poolsWeCanUse)

                /* Validate pool to use. */
                // if (!poolToUse) {
                //     continue
                // }

                /* Validate server statistics. */
                // if (!(this.serverStats && this.serverStats.shuffleWebSocketPort)) {
                //     console.error('Cannot find shuffle server information') // eslint-disable-line no-console
                //     continue
                // }

                try {
                    debug('Starting new round')
                    // await this.startNewRound(coinToShuffle, poolToUse)
                    await this.startNewRound(coinToShuffle)
                } catch (nope) {
                    console.error('Cannot shuffle coin:', nope) // eslint-disable-line no-console
                    continue
                }
            } else {
                // debug('No coins to shuffle',
                //     this.coins.length,
                //     this.rounds.length,
                //     this.maxShuffleRounds
                // )
            }
        } else {
            /* Set lost server connection flag. */
            this.lostServerConnection = true
        }

        /* Delay execution. */
        await delay(DELAY_IN_MS)
    }
}

/* Export module. */
module.exports = shuffle
