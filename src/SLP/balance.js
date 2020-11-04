/* Import modules. */
const debug = require('debug')('nitojs:slp:balance')
const Query = require('./Query')

/**
 * Random Bytes
 */
const balance = (_txid) => {
    debug(`Request balance for [ ${_txid} ]`)

    const query = {
        v: 3,
        q: {
            db: ['c', 'u'],
            aggregate: [
                {
                    $match: {
                        'tx.h': _txid,
                    },
                },
                {
                    $limit: 1,
                },
                {
                    $lookup: {
                        from: 'graphs',
                        localField: 'tx.h',
                        foreignField: 'graphTxn.txid',
                        as: 'graph',
                    },
                },
                {
                    $lookup: {
                        from: 'tokens',
                        localField: 'slp.detail.tokenIdHex',
                        foreignField: 'tokenDetails.tokenIdHex',
                        as: 'token',
                    },
                },
            ],
            limit: 1,
        },
    }

    /* Request query. */
    const response = Query.request(query)

    /* Return query response. */
    return response
}

/* Export module. */
module.exports = balance
