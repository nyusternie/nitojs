/* Import modules. */
const superagent = require('superagent')
const util = require('util')

// examples source:
// https://github.com/fountainhead-cash/bitplaylist/blob/master/bitdb/README.md

/* Set endpoint. */
const ENDPOINT = 'https://bitdb.fountainhead.cash/q/'

/* Set fountainhead API key. */
const APIKEY = '1M2PjV7yGRg4dB8N32Qhw1wrDfDfZyi8VQ'

/**
 * All (Firehose)
 */
const all = {
    v: 3,
    q: {
        find: {},
        limit: 10
    }
}

/**
 * Confirmed ONLY
 */
const confirmedOnly = {
    v: 3,
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
    v: 3,
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
    v: 3,
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
    v: 3,
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
    v: 3,
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
    v: 3,
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
    v: 3,
    q: {
        find: { 'out.h1': '534c5000', 'out.s3': 'GENESIS' },
        limit: 20,
        project: { 'out.$': 1, '_id': 0 }
    },
    r: {
        f: '[.[] | .out[0] | {title: "[\\(.s4)] \\(.s5)", document_url: .s6} ]'
    }
}

/* Set query. */
const query = Buffer.from(
    JSON.stringify(strInterpolation)
).toString('base64')

/* Set target. */
const target = ENDPOINT + query

/* Call remote API. */
superagent
    .get(target)
    // .set('key', APIKEY)
    .end((err, res) => {
        if (err) return console.error(err) // eslint-disable-line no-console

        /* Set data (body). */
        const data = res.body

        /* Validate (confirmed) data. */
        if (data.c) {
            /* Loop through each record. */
            data.c.forEach(output => {
                console.log(output)
            })
        } else {
            console.error('\nReceived unparceable data:', util.inspect(data, false, null, true))
        }
    })
