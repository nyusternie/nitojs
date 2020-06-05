/* Import modules. */
const EventSource = require('eventsource')
const util = require('util')

// examples source:
// https://github.com/fountainhead-cash/bitplaylist/blob/master/bitsocket/README.md

/* Set endpoint. */
const ENDPOINT = 'https://bitsocket.bch.sx/s/'

/**
 * All (Firehose)
 */
const all = {
    v: 3,
    q: {
        find: {},
    },
}

/**
 * Address
 *
 * Watch for a transfer from certain address.
 */
const address = {
    v: 3,
    q: {
        find: {
            'out.e.a': 'qq4kp3w3yhhvy4gm4jgeza4vus8vpxgrwc90n8rhxe',
        },
    },
}

/**
 * Memo Posts
 *
 * Listen to all realtime memo.cash posts.
 */
const memoPosts = {
    v: 3,
    q: {
        find: { 'out.h1': '6d02' },
    },
    r: {
        f: '.[] | .out[] | select(.b0.op? == 106) | .s2',
    },
}

/**
 * Memo Topic
 *
 * Listen to a specific topic.
 */
const memoTopic = {
    v: 3,
    q: {
        find: { 'out.h1': '6d0c', 'out.s2': 'playBCH_bot' },
    },
    r: {
        f: '.[] | .out[] | select(.b0.op? == 106) | .s3'
    }
}

/**
 * Coinbase
 *
 * Only monitor coinbase transactions.
 */
const coinbase = {
    v: 3,
    q: {
        db: ['c'],
        find: {
            'in.0': {
                '$exists': false,
            }
        }
    },
    r: {
        f: '.[] | {winner: .out[0].e.a, prize: "\\(.out[0].e.v/100000000) BCH", transactionId: .tx.h, block_height: .blk.i, block_hash: .blk.h}'
    }
}

/**
 * Transactions
 *
 * Monitor full firehose and emit a transaction graph as event
 * for each transaction.
 */
const transactions = {
    v: 3,
    q: {
        find: {}
    },
    r: {
        f: ".[] | { from: [.in[] | { prevTransactionId: .e.h, sender: \"bitcoincash:\\(.e.a)\" }], to: [.out[] | { receiver: \"bitcoincash:\\(.e.a?)\", amount: .e.v? }] }"
    }
}

/**
 * Transaction Explorers
 *
 * Monitor full firehose and emit a custom object made up of
 * transaction id and block explorer urls.
 */
const txExplorers = {
  v: 3,
  q: {
      find: {}
  },
  r: {
      f: '.[] | { id: .tx.h, explorers: ["https://explorer.bitcoin.com/bch/tx/\\(.tx.h)", "https://blockchair.com/bitcoin-cash/transaction/\\(.tx.h)"] }'
  }
}

/* Set query. */
const query = Buffer.from(
    JSON.stringify(memoPosts)
).toString('base64')

/* Set (event) source. */
const source = ENDPOINT + query

/* Initialize BitSocket. */
const bitsocket = new EventSource(source)

/* Handle connection opening. */
bitsocket.onopen = function () {
    console.log('Started listening...')
}

/* Handle connection closing. */
bitsocket.onclose = function () {
    console.log('Stopped listening')
}

/* Handle message. */
bitsocket.onmessage = function (_evt) {
    /* Parse data. */
    const data = JSON.parse(_evt.data)
    console.log('\nReceived data:', util.inspect(data, false, null, true))
}

/**
 * Query Class
 */
class Query {
    constructor() {

    }

    /**
     * Get Account Balance
     *
     * Retruns the balance for an account.
     *
     * NOTE: An account represents an entire derivation path, eg:
     *       m/44'/145'/0'/<chain>/<address-index>
     */
    getAccountBalance() {

    }

    /**
     * Get Address Balance
     *
     * Retruns the balance for an individual account address.
     */
    getAddressBalance() {

    }

}

/* Export module. */
module.exports = Query
