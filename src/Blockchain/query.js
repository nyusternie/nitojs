/* Import modules. */
const debug = require('debug')('nitojs:blockchain:query')
const superagent = require('superagent')
const util = require('util')

// examples source:
// https://github.com/fountainhead-cash/bitplaylist/blob/master/bitdb/README.md

/* Set endpoint. */
const ENDPOINT = 'https://bitdb.bch.sx/q/'
// const ENDPOINT = 'https://bitdb.devops.cash/q/'

/* Set fountainhead API key. */
const APIKEY = '1M2PjV7yGRg4dB8N32Qhw1wrDfDfZyi8VQ'

/* Set BitDB query language version. */
const VERSION = 3

/**
 * All (Firehose)
 */
const all = {
    v: VERSION,
    q: {
        find: {},
        limit: 10
    }
}

/**
 * Confirmed ONLY
 */
const confirmedOnly = {
    v: VERSION,
    q: {
        db: ['c'],
        find: {},
        limit: 10
    }
}

/**
 * Memo Posts
 *
 * Listen to all realtime memo.cash posts.
 */
const memoPosts = {
    v: VERSION,
    q: {
        find: { 'out.b0': { 'op': 106 }, 'out.h1': '6d02' },
        project: { 'out.$': 1 }
    },
    r: {
        f: '[ .[] | { msg: .out[0].s2 } ]'
    }
}

/**
 * Memo Formatted
 *
 * Listen to all realtime memo.cash posts.
 */
const memoFormatted = {
    v: VERSION,
    q: {
        find: { 'out.h1': '6d02' },
        limit: 10
    },
    r: {
        f: '[ .[] | { txid: .tx.h, block: .blk.i?, timestamp: .blk.t?, one: .out[0].s2, two: .out[1].s2 } ]'
    }
}

// FOR DEVELPMENT PURPOSES ONLY
const complex = {
    v: VERSION,
    q: {
        db: ['c'],
        find: { 'out.h1': '6d02' },
        limit: 100
    },
    r: {
        f: '[ group_by(.blk.h)[] | { blocks: { (.[0].blk.i | tostring): [.[] | {message: .out[1].s2, tx: .tx.h} ] } } ]'
    }
}

// FOR DEVELPMENT PURPOSES ONLY
const mongoProjection = {
    v: VERSION,
    q: {
        find: { 'out.h1': '6d02' },
        limit: 10,
        project: { 'out.$': 1 }
    }
}

/**
 * Text Search
 */
const txtSearch = {
    v: VERSION,
    q: {
        find: {
            '$text': { '$search': 'bet' },
            'out.h1': '6d02'
        },
        project: { 'out.$': 1 },
        limit: 10
    }
}

// FOR DEVELPMENT PURPOSES ONLY
const strInterpolation = {
    v: VERSION,
    q: {
        find: { 'out.h1': '534c5000', 'out.s3': 'GENESIS' },
        limit: 20,
        project: { 'out.$': 1, '_id': 0 }
    },
    r: {
        f: '[.[] | .out[0] | {title: "[\\(.s4)] \\(.s5)", document_url: .s6} ]'
    }
}

/**
 * Database Query
 *
 * Performs an on-chain BitDB query.
 */
const dbQuery = async (_params) => {
    /* Set query. */
    const query = Buffer.from(
        JSON.stringify(_params)
    ).toString('base64')

    /* Set target. */
    const target = ENDPOINT + query

    /* Call remote API. */
    const response = await superagent
        .get(target)
        .set('key', APIKEY)
        .catch(err => console.error(err)) // eslint-disable-line no-console

    /* Validate response. */
    if (response && response.body) {
        debug('DB QUERY (response.body):', response.body)
        // console.log('DB QUERY (response.body):',
        //     util.inspect(response.body, false, null, true))

        /* Return body. */
        return response.body
    } else {
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
        console.log('DB QUERY RESPONSE', response)

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
            /* Convert to integer. */
            _vout = parseInt(_vout)
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

}

// ;(async () => {
//     console.log(await Query
//         .isSpent('5cd9fdf3cbed66305daf736b0c2ad1e01773b9a64b1d2d35cb4a0256c6b20092', 0))
// })()

/* Export module. */
module.exports = Query
