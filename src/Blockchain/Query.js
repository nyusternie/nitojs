/* Import modules. */
const debug = require('debug')('nitojs:blockchain:query')
const superagent = require('superagent')
// const util = require('util')

// examples source:
// https://github.com/fountainhead-cash/bitplaylist/blob/master/bitdb/README.md

/* Set endpoints. */
const ENDPOINTS = [
    'https://bitdb.bch.sx/q/',
    'https://bitdb.devops.cash/q/',
]

/* Set fountainhead API key. */
const APIKEY = '1M2PjV7yGRg4dB8N32Qhw1wrDfDfZyi8VQ'

/* Set BitDB query language version. */
const VERSION = 3

/**
 * All (Firehose)
 */
// const all = {
//     v: VERSION,
//     q: {
//         find: {},
//         limit: 10
//     }
// }

/**
 * Confirmed ONLY
 */
// const confirmedOnly = {
//     v: VERSION,
//     q: {
//         db: ['c'],
//         find: {},
//         limit: 10
//     }
// }

/**
 * Memo Posts
 *
 * Listen to all realtime memo.cash posts.
 */
// const memoPosts = {
//     v: VERSION,
//     q: {
//         find: { 'out.b0': { 'op': 106 }, 'out.h1': '6d02' },
//         project: { 'out.$': 1 }
//     },
//     r: {
//         f: '[ .[] | { msg: .out[0].s2 } ]'
//     }
// }

/**
 * Memo Formatted
 *
 * Listen to all realtime memo.cash posts.
 */
// const memoFormatted = {
//     v: VERSION,
//     q: {
//         find: { 'out.h1': '6d02' },
//         limit: 10
//     },
//     r: {
//         f: '[ .[] | { txid: .tx.h, block: .blk.i?, timestamp: .blk.t?, one: .out[0].s2, two: .out[1].s2 } ]'
//     }
// }

// FOR DEVELPMENT PURPOSES ONLY
// const complex = {
//     v: VERSION,
//     q: {
//         db: ['c'],
//         find: { 'out.h1': '6d02' },
//         limit: 100
//     },
//     r: {
//         f: '[ group_by(.blk.h)[] | { blocks: { (.[0].blk.i | tostring): [.[] | {message: .out[1].s2, tx: .tx.h} ] } } ]'
//     }
// }

// FOR DEVELPMENT PURPOSES ONLY
// const mongoProjection = {
//     v: VERSION,
//     q: {
//         find: { 'out.h1': '6d02' },
//         limit: 10,
//         project: { 'out.$': 1 }
//     }
// }

/**
 * Text Search
 */
// const txtSearch = {
//     v: VERSION,
//     q: {
//         find: {
//             '$text': { '$search': 'bet' },
//             'out.h1': '6d02'
//         },
//         project: { 'out.$': 1 },
//         limit: 10
//     }
// }

// FOR DEVELPMENT PURPOSES ONLY
// const strInterpolation = {
//     v: VERSION,
//     q: {
//         find: { 'out.h1': '534c5000', 'out.s3': 'GENESIS' },
//         limit: 20,
//         project: { 'out.$': 1, '_id': 0 }
//     },
//     r: {
//         f: '[.[] | .out[0] | {title: "[\\(.s4)] \\(.s5)", document_url: .s6} ]'
//     }
// }

/**
 * Database Query
 *
 * Performs an on-chain BitDB query.
 */
const dbQuery = async (_params, _endpoint = ENDPOINTS[0], _retry = false) => {
    /* Set query. */
    const query = Buffer.from(
        JSON.stringify(_params)
    ).toString('base64')

    /* Set target. */
    const target = _endpoint + query

    /* Initialize response. */
    let response = null

    /* Initialize error. */
    let error = null

    /* Call remote API. */
    response = await superagent
        .get(target)
        .set('key', APIKEY)
        .catch(err => {
            console.error(err) // eslint-disable-line no-console

            /* Set error. */
            error = err
        })

    /* Validate response and error. */
    // NOTE: We will automatically retry the "fallback" before failing.
    if ((!response || error) && !_retry) {
        // console.log('RETRYING REQUEST (fallback)', _params)
        response = await dbQuery(_params, ENDPOINTS[1], true)
            .catch(err => console.error(err)) // eslint-disable-line no-console
        // console.log('RESPONSE (fallback)', response)

        /* Validate response. */
        if (response) {
            /* Set retry flag. */
            _retry = true
        }
    }

    /* Validate response. */
    if (response && response.body) {
        debug('DB query (response.body):', response.body)
        // console.log('DB QUERY (response.body):',
        //     util.inspect(response.body, false, null, true))

        /* Return (response) body. */
        return response.body
    } else if (response && _retry) {
        debug('DB query retry (response):', response)
        // console.log('DB QUERY (response):',
        //     util.inspect(response, false, null, true))

        /* Return response. */
        return response
    } else {
        debug('Failed to retrieve query response from ENDPOINT or FALLBACK.')

        /* Return null. */
        return null
    }
}

/**
 * Query Class
 */
class Query {
    constructor() {

    }

    /**
     * Get Block Height
     *
     * Returns the latest block height.
     */
    static async getBlockHeight() {
        const query = {
            v: VERSION,
            q: {
                db: ['c'],
                find: {},
                limit: 1
            },
            r: {
                f: `[ .[] | .blk.i ]`
            }
        }

        /* Request query. */
        const response = await dbQuery(query)
        debug('Database query response:', response)
        // console.log('Database query response:', response)

        /* Validate query. */
        if (response && response.c) {
            /* Return result. */
            return response.c[0]
        } else {
            /* Return null. */
            return null
        }
    }

    /**
     * Get Account Balance
     *
     * Retruns the balance for an account.
     *
     * NOTE: An account represents an entire derivation path, eg:
     *       m/44'/145'/0'/<chain>/<address-index>
     */
    static getAccountBalance(_account) {
        debug('Request balance for:', _account)
    }

    /**
     * Get Address Balance
     *
     * Retruns the balance for an individual account address.
     */
    static getAddressBalance(_address) {
        debug('Request balance for:', _address)
    }

    /**
     * Is Spent
     *
     * Searches for a specific transaction output and determines if it
     * has already been spent.
     */
    static async isSpent(_txid, _vout) {
        /* Validate transaction id. */
        if (!_txid) {
            throw new Error('A transaction id is required!')
        }

        /* Validate output index. */
        if (_vout === null || typeof _vout === 'undefined') {
            throw new Error('An output index is required!')
        } else {
            /* Convert to (valid) number. */
            _vout = Number(_vout)
        }

        /* Initialize query. */
        const query = {
            v: 3,
            q: { find: { 'in.e.h': _txid } },
            r: { f: '[ .[] | .in ]' }
        }
        debug('isSpent (query):', query)

        /* Request query. */
        const response = await dbQuery(query)

        /* Validate query. */
        if (response && response.u && response.c) {
            /* Initialize found. */
            // NOTE: `find` returns `undefined` when NOT found.
            let found = null

            /* Search unconfirmed. */
            response.u.forEach((items) => {
                /* Validate found. */
                if (found === null || typeof found === 'undefined') {
                    found = items.find(item => {
                        return (item.e.h === _txid && item.e.i === _vout)
                    })
                }
            })

            /* Search confirmed. */
            response.c.forEach((items) => {
                /* Validate found. */
                if (found === null || typeof found === 'undefined') {
                    found = items.find(item => {
                        return (item.e.h === _txid && item.e.i === _vout)
                    })
                }
            })

            /* Validate found. */
            if (found === null || typeof found === 'undefined') {
                debug('Found NO spent UTXO.')
                /* Return false. */
                return false
            } else {
                debug('FOUND a spent UTXO', found)
                /* Return true. */
                return true
            }
        } else {
            /* Return false. */
            return false
        }
    }

    /**
     * Request
     */
    static async request(_query) {
        debug('requesting (query):', _query)

        /* Request query. */
        const response = await dbQuery(_query)

        /* Return response. */
        return response
    }

}

/* Export module. */
module.exports = Query
