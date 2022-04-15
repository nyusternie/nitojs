/* Import modules. */
const debug = require('debug')('nitojs:blockchain:insomnia')
const EventEmitter = require('events').EventEmitter
const superagent = require('superagent')

/* Set endpoints. */
const ENDPOINTS = [
    'https://insomnia.fountainhead.cash/v1/',
    'https://insomnia.devops.cash/v1/',
]

/**
 * REST Request
 *
 * Performs an on-chain Insomnia query.
 */
const _request = async (_query) => {
    /* Set target. */
    const target = ENDPOINTS[0] + _query

    /* Call remote API. */
    const response = await superagent
        .get(target)
        .catch(err => console.error(err)) // eslint-disable-line no-console

    /* Validate response. */
    if (response) {
        /* Return response. */
        return response
    } else {
        return null
    }
}

/**
 * Insomnia Class
 *
 * Insomnia is a lightweight REST server which provides an easy way to
 * interact with the Bitcoin Cash blockchain using HTTP(S). It is built
 * on top of the electrum protocol, which powers Electron Cash.
 *
 * source: https://electrumx.readthedocs.io/en/latest/protocol.html
 */
class Insomnia extends EventEmitter {
    constructor() {
        super()

        /* Initialize context. */
        // NOTE: Called within an interval closure.
        this._checkActivity = this._checkActivity.bind(this)

        debug('Insomnia has been initialized.')
    }

    /**
     * Balance
     *
     * Returns balances (confirmed and unconfirmed) for address.
     */
    static async balance(_address) {
        /* Validate address. */
        if (!_address) {
            return null
        }

        /* Set target. */
        const target = ENDPOINTS[0] + 'address/balance/' + _address

        /* Call remote API. */
        const response = await superagent
            .get(target)
            .catch(err => console.error(err)) // eslint-disable-line no-console

        /* Validate response. */
        if (response && response.body && response.body.success) {
            /* Return response. */
            return {
                confirmed: response.body.confirmed,
                unconfirmed: response.body.unconfirmed,
            }
        } else {
            return null
        }
    }

    /**
     * Broadcast
     *
     * Submits a raw transaction to the network.
     */
    static async broadcast(_rawTx) {
        /* Set target. */
        const target = ENDPOINTS[0] + 'tx/broadcast'

        /* Initialize error. */
        let error

        /* Call remote API. */
        const response = await superagent
            .post(target)
            .set('Content-Type', 'text/plain')
            .send(_rawTx)
            .catch(err => {
                debug(err)

                /* Set error. */
                error = err
            })

        /* Validate response. */
        if (response && response.body) {
            /* Return response. */
            return response.body
        } else if (response) {
            /* Return response. */
            return response
        } else if (error && error.response && error.response.body) {
            /* Return error. */
            return error.response.body
        } else if (error) {
            /* Return error. */
            return error
        } else {
            /* Return null. */
            return null
        }

    }

    /**
     * History
     *
     * Returns address history.
     */
    static async history(_address) {
        /* Validate address. */
        if (!_address) {
            return null
        }

        /* Set target. */
        const target = ENDPOINTS[0] + 'address/history/' + _address

        /* Call remote API. */
        const response = await superagent
            .get(target)
            .catch(err => console.error(err)) // eslint-disable-line no-console

        /* Validate response. */
        if (response && response.body && response.body.success) {
            /* Return response. */
            return response.body.txs
        } else {
            return null
        }
    }

    /**
     * Memory Pool
     *
     * Returns address memory pool.
     */
    static async mempool(_address) {
        /* Validate address. */
        if (!_address) {
            return null
        }

        /* Set target. */
        const target = ENDPOINTS[0] + 'address/mempool/' + _address

        /* Call remote API. */
        const response = await superagent
            .get(target)
            .catch(err => console.error(err)) // eslint-disable-line no-console

        /* Validate response. */
        if (response && response.body && response.body.success) {
            /* Return response. */
            return response.body.txs
        } else {
            return null
        }
    }

    /**
     * Transaction
     *
     * Returns raw (or optionally formatted) transaction data.
     */
    static async transaction(_txid, _verbose = true) {
        /* Validate transaction id. */
        if (!_txid) {
            return null
        }

        /* Set target. */
        const target = ENDPOINTS[0] + 'tx/data/' + _txid + (_verbose ? '?verbose=true' : '')

        /* Call remote API. */
        const response = await superagent
            .get(target)
            .catch(err => console.error(err)) // eslint-disable-line no-console

        /* Validate response. */
        if (response && response.body && response.body.success) {
            /* Return response. */
            return response.body.tx
        } else {
            return null
        }
    }

    /**
     * Unspent Transaction Outputs (UTXOs)
     *
     * Returns all available unspent coins.
     */
    static async utxos(_address) {
        /* Set query. */
        const query = `address/utxos/${_address}`

        /* Request query. */
        const response = await _request(query)
            .catch(err => console.error(err)) // eslint-disable-line no-console
        // console.log('INSOMNIA UNSPENT (response):', response)

        /* Validate query. */
        if (response && response.body && response.body.success) {
            /* Return result. */
            return response.body.utxos
        } else {
            /* Return null. */
            return null
        }
    }
}

/* Export module. */
module.exports = Insomnia
