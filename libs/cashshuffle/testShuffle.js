/* Import core modules. */
const _ = require('lodash')
const debug = require('debug')('cashshuffle:test')
const repl = require('repl')

/* Import local modules. */
const ShuffleClient = require('./ShuffleClient.js')
const JsonWallet = require('./JsonWallet')

/* Initialize shuffle. */
const shuffleIt = repl.start('cashshuffle > ')

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/* Initialize new wallet. */
const myWallet = new JsonWallet({
    file: './test_json_wallet.js'
})

/* Unfreeze any frozen addresses. */
myWallet.unfreezeAddresses(
    _.map(myWallet.addresses, 'cashAddress')
)

/* Load up our on-disk HD wallet. */
shuffleIt.context.wallet = myWallet

// The two functions below provide us a way
// of plugging the `ShuffleClient` into our
// bitcoin wallet software.  They are called
// by the client when new payment addresses
// are needed during shuffle operations.

/**
 * New Change Address from Wallet
 *
 * This function should return a single new change address when called.
 * We pass this function as a parameter to our `ShuffleClient` instance so
 * that it may fetch change addresses as needed.
 */
const newChangeAddressFromWallet = function () {
    return myWallet.fresh.change()
}

/**
 * New Address for Shuffled Coin
 *
 * Same as above, but for shuffled coins.  The on-disk wallet is using a
 * dedicated HD path for all shuffled coins.
 */
const newAddressForShuffledCoin = function () {
    return myWallet.fresh.shuffle()
}

/**
 * Grab Coin to Shuffle
 */
const grabCoinToShuffle = async function () {
    /* Initialize coin. */
    let coin

    if (myWallet.addresses.length) {
        // debug('Wallet addresses', myWallet.addresses)
        // debug('Wallet coins', myWallet.coins)

        // myWallet.addresses[0].fund()
    } else {
        // myWallet.fresh.deposit()
    }

    debug('Wallet coins', myWallet.coins)

    while (!coin) {
        coin = _.find(_.shuffle(myWallet.coins.slice(0, 8)), {
        // coin = _.find(myWallet.coins.reverse(), {
            frozen: false
        })

        /* Validate coin. */
        if (coin) {
            debug('Address to shuffle:', coin.cashAddress)
            myWallet.freezeAddresses(coin.cashAddress)
            continue
        } else {
            // debug('...')
            await delay(750)
        }
    }

    /* Return coin. */
    return coin
}

/**
 * Add Client to Shuffle
 */
const addClientToShuffle = async function (clientNumber) {
    /* Initialize client name. */
    const clientName = `client #${clientNumber}`

    debug(`Adding ${clientName} to the shuffle..`)

    /* Initialize new shuffle client. */
    shuffleIt.context[clientName] = new ShuffleClient({
        coins: [ await grabCoinToShuffle() ],
        hooks: {
            change: newChangeAddressFromWallet,
            shuffled: newAddressForShuffledCoin
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
    shuffleIt.context[clientName].on('shuffle', async (shuffleRound) => {
        debug(`Coin ${shuffleRound.coin.txid}:${shuffleRound.coin.vout} has been successfully shuffled!`)

        // Just a random delay to more equally distribute
        // the load on the bitcoin.com servers.
        await delay(Math.random() * 3000 + 570)

        try {
            await myWallet.updateAddresses()
        } catch (nope) {
            console.error('Somethings gone wrong', nope) // eslint-disable-line no-console

            /* Quit application. */
            process.exit()
        }

        /* Set coins to unfreeze. */
        const coinsToUnfreeze = _.map([
            shuffleRound.change, shuffleRound.shuffled
        ], 'cashAddress')

        /* Unfreeze coins. */
        myWallet.unfreezeAddresses(coinsToUnfreeze)

        shuffleIt.context[clientName]
            .addUnshuffledCoins([ await grabCoinToShuffle() ])
    })
}

myWallet
    .updateAddresses()
    .catch((someError) => {
        console.error('Error building coin info from wallet:', someError) // eslint-disable-line no-console
        throw (someError)
    })
    .then(async (updatedWallet) => {
        if (updatedWallet) {
            debug('Wallet has been updated successfully!')
        }

        /* Initialize number of clients. */
        let numberOfClients = 1

        /* Loop through all clients. */
        while (numberOfClients > 0) {
            try {
                await addClientToShuffle(numberOfClients)
            } catch (nope) {
                console.error('Cannot add new client to shuffle:', nope) // eslint-disable-line no-console

                /* Quit application. */
                process.exit()
            }

            await delay(Math.random() * 1000 + 500)

            /* Reduce clients. */
            numberOfClients--
        }
    })
