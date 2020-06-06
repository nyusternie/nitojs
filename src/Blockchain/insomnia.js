/* Import modules. */
const debug = require('debug')('nitojs:blockchain:insomnia')
const superagent = require('superagent')
const util = require('util')

/* Set endpoints. */
const ENDPOINT = 'https://insomnia.devops.cash/v1/'
const ENDPOINT_FALLBACK = 'https://insomnia.fountainhead.cash/v1/'

/* Set constants. */
const ACTIVITY_INTERVAL = 2000

/**
 * Check Activity
 */
const _checkActivity = async (_query) => {
    const response = await request(_query)
    console.log('CHECK ACTIVITY RESPONSE', response)
}

/**
 * REST Request
 *
 * Performs an on-chain Insomnia query.
 */
const _request = async (_query) => {
    /* Set target. */
    const target = ENDPOINT + _query

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
 * A lightweight REST server which provides an easy way to interact with
 * the Bitcoin Cash blockchain using HTTP. It is built on top of the
 * electrum protocol, which powers Electron Cash.
 */
class Insomnia {
    constructor() {
        /* Initialize watch addresses. */
        this.watching = []

        /* Initialize (interval) monitor. */
        this.monitor = null
    }

    /**
     * Broadcast
     *
     * Submits a raw transaction to the network.
     */
    static async broadcast(_rawTx) {
        /* Set target. */
        const target = ENDPOINT + 'tx/broadcast'

        /* Call remote API. */
        const response = await superagent
            .post(target)
            .set('Content-Type', 'text/plain')
            .send(_rawTx)
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
     * Get Unspent Transaction Outputs (UTXOs)
     *
     * Returns all available "coins".
     */
    static async getUnspent(_address) {
        const query = `address/utxos/${_address}`

        /* Request query. */
        const response = await _request(query)
        console.log('INSOMNIA RESPONSE', response)

        /* Validate query. */
        if (response) {
            /* Return result. */
            return response
        } else {
            /* Return null. */
            return null
        }
    }

    /**
     * (Address) Registration
     */
    async _registration (_address) {
        const query = `address/utxos/${_address}`
        const response = await _request(query)
        console.log('REQUEST RESPONSE', response)

        if (!response || !response.success) {
            return null
        }

        /* Add address to watching. */
        this.watching.push({
            address: _address,
            utxos: response.utxos,
        })
    }


    /**
     * Watch Address
     *
     * Watches an address and reports ANY on-chain activity.
     */
    watchAddress(_address) {
        /* Validate address. */
        if (!_address) {
            /* Throw an error. */
            // return `Address [ ${_address} ] is invalid!`
            throw new Error(`Address [ ${_address} ] is invalid!`)
        }

        /* Validate watching. */
        if (!this.watching.includes(_address)) {
            /* Register new address. */
            this._registration(_address)

            /* Validate monitor. */
            if (!this.monitor) {
                this.monitor = setInterval(this.checkActivity, ACTIVITY_INTERVAL)
                debug('A new monitor has been created.')
            }

            debug(`Now watching [ ${_address} ]`)
            /* Return current watching list. */
            return this.watching
        }
    }

}

/* Export module. */
module.exports = Insomnia
