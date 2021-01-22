/* Import modules. */
const debug = require('debug')('nitojs:blockchain:socket')
const EventEmitter = require('events').EventEmitter
const EventSource = require('eventsource')
const util = require('util')

// examples source:
// https://github.com/fountainhead-cash/bitplaylist/blob/master/bitsocket/README.md

/* Set endpoint. */
// const ENDPOINT = 'https://bitsocket.bch.sx/s/'
const ENDPOINT = 'https://bitsocket.devops.cash/s/'

/* Set fountainhead API key. */
// const APIKEY = '1M2PjV7yGRg4dB8N32Qhw1wrDfDfZyi8VQ'

/* Set BitDB query language version. */
const VERSION = 3

/**
 * All (Firehose)
 */
// const all = {
//     v: VERSION,
//     q: {
//         find: {},
//     },
// }

/**
 * Address
 *
 * Watch for a transfer from certain address.
 */
// const address = {
//     v: VERSION,
//     q: {
//         find: {
//             'out.e.a': 'qq4kp3w3yhhvy4gm4jgeza4vus8vpxgrwc90n8rhxe',
//         },
//     },
// }

/**
 * Memo Posts
 *
 * Listen to all realtime memo.cash posts.
 */
// const memoPosts = {
//     v: VERSION,
//     q: {
//         find: { 'out.h1': '6d02' },
//     },
//     r: {
//         f: '.[] | .out[] | select(.b0.op? == 106) | .s2',
//     },
// }

/**
 * Memo Topic
 *
 * Listen to a specific topic.
 */
// const memoTopic = {
//     v: VERSION,
//     q: {
//         find: { 'out.h1': '6d0c', 'out.s2': 'playBCH_bot' },
//     },
//     r: {
//         f: '.[] | .out[] | select(.b0.op? == 106) | .s3'
//     }
// }

/**
 * Coinbase
 *
 * Only monitor coinbase transactions.
 */
// const coinbase = {
//     v: VERSION,
//     q: {
//         db: ['c'],
//         find: {
//             'in.0': {
//                 '$exists': false,
//             }
//         }
//     },
//     r: {
//         f: '.[] | {winner: .out[0].e.a, prize: "\\(.out[0].e.v/100000000) BCH", transactionId: .tx.h, block_height: .blk.i, block_hash: .blk.h}'
//     }
// }

/**
 * Transactions
 *
 * Monitor full firehose and emit a transaction graph as event
 * for each transaction.
 */
// const transactions = {
//     v: VERSION,
//     q: {
//         find: {}
//     },
//     r: {
//         f: ".[] | { from: [.in[] | { prevTransactionId: .e.h, sender: \"bitcoincash:\\(.e.a)\" }], to: [.out[] | { receiver: \"bitcoincash:\\(.e.a?)\", amount: .e.v? }] }"
//     }
// }

/**
 * Transaction Explorers
 *
 * Monitor full firehose and emit a custom object made up of
 * transaction id and block explorer urls.
 */
// const txExplorers = {
//     v: VERSION,
//     q: {
//         find: {}
//     },
//     r: {
//         f: '.[] | { id: .tx.h, explorers: ["https://explorer.bitcoin.com/bch/tx/\\(.tx.h)", "https://blockchair.com/bitcoin-cash/transaction/\\(.tx.h)"] }'
//     }
// }

/**
 * Socket Class
 */
class Socket extends EventEmitter {
    constructor() {
        super()

        debug('Socket class has been initialized.')

        /* Initialize bitsocket. */
        this.bitsocket = null
    }

    /**
     * Close (Socket) Connection
     */
    close() {
        /* Close bitsocket connection. */
        this.bitsocket.close()
    }

    /**
     * Watch Address
     *
     * Watches an address for any on-chain activity.
     */
    watchAddress(_address) {
        /* Validate address. */
        if (!_address) {
            return `Address [ ${_address} ] is invalid!`
        }

        /* Validate prefix. */
        if (_address.indexOf('bitcoincash:') !== -1) {
            _address = _address.slice(12)
        }

        /* Set (query) parameters. */
        const params = {
            v: VERSION,
            q: {
                find: {
                    'out.e.a': _address,
                },
            },
        }

        /* Set query. */
        const query = Buffer.from(
            JSON.stringify(params)
        ).toString('base64')

        /* Set (event) source. */
        const source = ENDPOINT + query

        /* Initialize BitSocket. */
        this.bitsocket = new EventSource(source)

        /* Handle connection opening. */
        this.bitsocket.onopen = () => {
            /* Set message. */
            const msg = `Started listening for [ ${JSON.stringify(params)} ]`
            debug(msg)
            // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

            /* Emit message. */
            this.emit('open', msg)
        }

        /* Handle connection closing. */
        this.bitsocket.onclose = () => {
            /* Set message. */
            const msg = `Stopped listening for [ ${JSON.stringify(params)} ]`
            debug(msg)
            // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

            /* Emit message. */
            this.emit('close', msg)
        }

        /* Handle message. */
        this.bitsocket.onmessage = (_evt) => {
            // console.log('ONMESSAGE (evt):', util.inspect(_evt, false, null, true))
            try {
                /* Parse data. */
                const data = JSON.parse(_evt.data)

                /* Set message. */
                const msg = `\nReceived data for [ ${JSON.stringify(params)} ]:`
                debug(msg, util.inspect(data, false, null, true))
                // console.log(msg, util.inspect(data, false, null, true))

                /* Emit data. */
                this.emit('update', data)
            } catch (err) {
                /* Emit error. */
                this.emit('error', err)
            }
        }

    }

}

/* Export module. */
module.exports = Socket
