/* Import modules. */
const debug = require('debug')('nitojs:blockchain:insomnia')
const EventEmitter = require('events').EventEmitter
const moment = require('moment')
const superagent = require('superagent')

/* Set endpoints. */
const ENDPOINT = 'https://insomnia.devops.cash/v1/'
// const ENDPOINT_FALLBACK = 'https://insomnia.fountainhead.cash/v1/'

/* Set constants. */
const ACTIVITY_INTERVAL = 5000 // FIXME: Slow, until we can batch our requests.

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
 * Insomnia is a lightweight REST server which provides an easy way to
 * interact with the Bitcoin Cash blockchain using HTTP(S). It is built
 * on top of the electrum protocol, which powers Electron Cash.
 *
 * source: https://electrumx.readthedocs.io/en/latest/protocol.html
 */
class Insomnia extends EventEmitter {
    constructor() {
        super()

        /* Initialize watch addresses. */
        this.watchList = null

        /* Initialize interval monitor. */
        this.intervalMonitor = null

        /* Initialize context. */
        // NOTE: Called within an interval closure.
        this._checkActivity = this._checkActivity.bind(this)
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
        const target = ENDPOINT + 'address/balance/' + _address

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
        const target = ENDPOINT + 'address/history/' + _address

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
        const target = ENDPOINT + 'address/mempool/' + _address

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
    static async transaction(_txid, _verbose = null) {
        /* Validate transaction id. */
        if (!_txid) {
            return null
        }

        /* Set target. */
        const target = ENDPOINT + 'tx/data/' + _txid + (_verbose ? '?verbose=true' : '')

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

    /**
     * Stop
     *
     * Performs a cleanup of the instance.
     */
    stop() {
        /* Clear interval monitor. */
        clearInterval(this.intervalMonitor)

        /* Destroy interval monitor. */
        this.intervalMonitor = null

        /* Destroy watch list. */
        this.watchList = null
    }

    /**
     * Watch Address
     *
     * Watches an address and reports ANY on-chain activity.
     *
     * TODO: Add ability to stop watching.
     */
    watchAddress(_address) {
        /* Validate address. */
        if (!_address) {
            /* Throw an error. */
            // return `Address [ ${_address} ] is invalid!`
            throw new Error(`Address [ ${_address} ] is invalid!`)
        }

        /* Validate watch list. */
        if (!this.watchList) {
            this.watchList = {}
        }

        /* Validate watch list address. */
        if (!this.watchList[_address]) {
            /* Register new address. */
            this._registration(_address)

            /* Validate interval monitor. */
            // FIXME: Make sure we don't re-create this, if it already exists.
            if (!this.intervalMonitor) {
                this.intervalMonitor = setInterval(
                    this._checkActivity,
                    ACTIVITY_INTERVAL
                )
                debug('Insomnia created a new interval monitor.')
                console.log('Insomnia created a new interval monitor.')
            }
        }

        /* Return current watch list. */
        return this.watchList
    }

    /**
     * Check Activity
     *
     * FIXME: Watch list may get destroyed during execution. Consider adding
     *        a delay (with `isRunning` flag) to the `stop` method.
     *
     * FIXME: Until we can batch our requests with BitDB, we should keep
     *        these requests slow, as there could be multiple addresses
     *        per activity check.
     */
    _checkActivity() {
        try {
            // console.log('INSOMNIA CHECK ACTIVITY (watchlist):', this.watchList)

            /* Validate watch list. */
            if (!this.watchList || Object.keys(this.watchList).length === 0) {
                return
            }

            Object.keys(this.watchList).forEach(async _address => {
                /* Initialize updates list. */
                const updates = []

                /* Set query. */
                const query = `address/utxos/${_address}`
                // console.log('INSOMNIA CHECK ACTIVITY (query):', query)

                /* Request query. */
                const response = await _request(query)
                // console.log('INSOMNIA CHECK ACTIVITY (response):', response)

                /* Validate response. */
                if (!response || !response.body) {
                    return
                }

                /* Set data. */
                const data = response.body

                /* Validate data. */
                if (!data || !data.success || !data.utxos) {
                    return
                }

                /* Initialize UTXOs. */
                const utxos = {}

                /* Process all UTXOs. */
                data.utxos.forEach(utxo => {
                    /* Set id. */
                    const id = `${utxo.tx_hash}:${utxo.tx_pos}`

                    /* Add to UTXOs. */
                    utxos[id] = utxo
                })
                // console.log('INSOMNIA CHECK ACTIVITY (UTXOs):', utxos)

                /* Handle additions. */
                Object.keys(utxos).forEach(_id => {
                    /* Search for UTXO. */
                    if (!this.watchList[_address].utxos[_id]) {
                        console.log('INSOMNIA ADDING UTXO:', _id)

                        /* Add UTXO to watch list. */
                        this.watchList[_address].utxos[_id] = utxos[_id]

                        /* Add address (for convenience). */
                        utxos[_id].address = _address

                        /* Add UTXO to updates. */
                        updates.push(utxos[_id])
                        // console.log('INSOMNIA ADDING UTXO (updates):', updates)
                    }
                })

                /* Handle removals. */
                Object.keys(this.watchList[_address].utxos).forEach(_id => {
                    /* Search for UTXO. */
                    if (!utxos[_id]) {
                        console.log('INSOMNIA REMOVING UTXO', _id)

                        /* Add address (for convenience). */
                        this.watchList[_address].utxos[_id].address = _address

                        /* Negate value (for convenience). */
                        this.watchList[_address].utxos[_id].value *= -1

                        /* Add UTXO to updates. */
                        // FIXME: Do we need to clone to prevent deletion??
                        updates.push(this.watchList[_address].utxos[_id])

                        /* Remove UTXO from watch list. */
                        delete this.watchList[_address].utxos[_id]
                    }
                })

                /* Validate updates. */
                if (updates.length > 0) {
                    /* Emit update */
                    this.emit('update', updates)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * (Address) Registration
     */
    async _registration(_address) {
        const query = `address/utxos/${_address}`
        const response = await _request(query)
        // console.log('INSOMNIA REGISTRATION (response):', response)

        /* Validate response. */
        if (!response || !response.body) {
            return null
        }

        /* Set body. */
        const data = response.body
        // console.log('INSOMNIA REGISTRATION (data):', data)

        /* Validate data. */
        if (!data || !data.success) {
            return null
        }

        /* Initialize UTXOs. */
        const utxos = {}

        /* Process all UTXOs. */
        data.utxos.forEach(utxo => {
            /* Set id. */
            const id = `${utxo.tx_hash}:${utxo.tx_pos}`

            /* Add to UTXOs. */
            utxos[id] = utxo
        })

        /* Add address to watch list. */
        this.watchList[_address] = {
            utxos,
            createdAt: moment().unix(),
        }

        debug(`Insomnia is now watching [ ${_address} ]`)
        console.log(`Insomnia is now watching [ ${_address} ]`)
    }

}

/* Export module. */
module.exports = Insomnia
