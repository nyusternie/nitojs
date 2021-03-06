/* Import core modules. */
const debug = require('debug')('cashshuffle:test')

/* Import local modules. */
const ShuffleClient = require('./src/libs/shuffle/ShuffleClient.js')
// const testCoins = require('./testCoins')

/* Initialize Shuffle Manager. */
let shuffleManager = null

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Start (CashShuffle)
 */
const start = async function () {
    debug(`Starting CashShuffle test...`)

    /* Initialize new shuffle client. */
    shuffleManager = new ShuffleClient({
        coins: [ require('./testCoins').source ],
        hooks: {
            change: require('./testCoins').change, // NOTE: This is a function.
            shuffled: require('./testCoins').target, // NOTE: This is a function.
        },
        protocolVersion: 300,
        maxShuffleRounds: 1,
        // Disable automatically joining shuffle rounds
        // once a connection with the server is established
        disableAutoShuffle: false,
        // serverUri: 'https://shuffle.servo.cash:1337',
        // serverUri: 'wss://shuffle.servo.cash:1338',
        serverStatsUri: 'https://shuffle.servo.cash:8080/stats'
        // serverStatsUri: 'http://qvzl7zjviaw6532kn5onvlqluwxrlwhjpybsya4fw33ggvhzrak4z3qd.onion:8081/stats'
    })

    /**
     * Shuffle Success
     *
     * This event is emitted only when a successful shuffle round occurs.
     * Currently all change is re-added to the client's pool of unshuffled
     * coins (but in the new address returned by the HD wallet hook) so
     * they too can be shuffled.
     *
     * NOTE: Here you would do things like un-freeze shuffled coins,
     *       update UI's, etc.
     */
    shuffleManager.on('shuffle', async (shuffleRound) => {
        debug(`Coin ${shuffleRound.coin.txid}:${shuffleRound.coin.vout} has been successfully shuffled!`)

        // Just a random delay to more equally distribute
        // the load on the bitcoin.com servers.
        await delay(Math.random() * 3000 + 570)

        /* Quit application. */
        process.exit()
    })
}

/* Start test. */
start()
