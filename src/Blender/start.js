/* Import modules. */
const debug = require('debug')('nitojs:blender:start')

/**
 * Start (New Request)
 *
 * Instantiate new request and add it to our requests array. Set the event
 * listeners so we know when a round has ended and needs cleanup.
 */
const start = async (_coin, poolAmount) => {
    debug('Start new round:',
        _coin,
        poolAmount,
    )
    /* Remove the coin from the pool of available coins. */
    // const coinToShuffle = _.remove(this.coins, _coin)[0]
    const coinToShuffle = _coin

    /* Validate coin shuffle. */
    if (!coinToShuffle) {
        throw new Error('coin_not_found')
    }

    /* Import request manager. */
    const Request = require('./Request')

    /* Initialize new shuffle round. */
    const newShuffleRound = new Request({
        hooks: this.hooks,
        coin: coinToShuffle,
        protocolVersion: this.protocolVersion,
        poolAmount,
        shuffleFee: this.shuffleFee
    })

    /* Handle when a shuffle round ends, successfully or not. */
    newShuffleRound.on('shuffle', this.cleanupCompletedRound.bind(this))

    /* Handle phase messages. */
    // NOTE: Pass any phase messages from our shuffleround instances
    //       to any listeners on the shuffleClass instance.
    newShuffleRound.on('phase', (_phase) => {
        this.emit('phase', _phase)
    })

    /* Handle notices. */
    newShuffleRound.on('notice', (_notice) => {
        /* Emit notice. */
        this.emit('notice', _notice)
    })

    newShuffleRound.on('complete', (_complete) => {
        this.emit('complete', _complete)
    })

    /* Handle debugging messages. */
    // NOTE: Pass any debug messages from our shuffleround instances
    //       to any listeners on the shuffleClass instance.
    newShuffleRound.on('debug', (someShuffleRoundMessage) => {
        this.emit('debug', someShuffleRoundMessage)
    })

    debug(
        'Attempting to mix a',
        newShuffleRound.coin.satoshis,
        'satoshi coin on',
    )

    /* Add new shuffle round. */
    this.rounds.push(newShuffleRound)
}

/* Export module. */
module.exports = start
