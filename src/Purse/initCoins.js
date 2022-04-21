/* Import components. */
const Blockchain = require('../Blockchain')

/**
 * Update Coin
 *
 * Updates the status of a coin in its respective session.
 */
// const _updateCoin = (_coin) => {
//     console.info('Updating coin...', _coin) // eslint-disable-line no-console
//
//     /* Request coins. */
//     const coins = this._coins
//     console.log('UPDATE COIN (coins):', coins)
//
//     /* Validate coins. */
//     if (!coins) {
//         return
//     }
//
//     /* Add coin to session. */
//     coins[`${_coin.txid}:${_coin.vout}`] = _coin
//
//     /* Update coins. */
//     this._coins = coins
//     // commit('setCoins', coins)
// }

/**
 * Update Status
 *
 * Will mark "spent" coins as disabled.
 */
// const _updateStatus = (_coins) => {
//     Object.keys(_coins).forEach(async coinid => {
//         /* Set txid. */
//         const txid = coinid.split(':')[0]
//
//         /* Set vout. */
//         const vout = coinid.split(':')[1]
//
//         /* Query spent status. */
//         const isSpent = await Blockchain.Query.isSpent(txid, vout)
//
//         /* Validate spent. */
//         if (isSpent) {
//             /* Set coin. */
//             const coin = _coins[coinid]
//
//             /* Validate status. */
//             if (coin && coin.status !== 'disabled') {
//                 /* Set status. */
//                 coin.status = 'disabled'
//
//                 /* Request coin update. */
//                 _updateCoin(coin)
//             }
//         }
//     })
// }

/**
 * Initialize Coins
 */
const initCoins = async function () {
    /* Set coins. */
    const coins = this._coins
    // console.log('INITIALIZING COINS (coins)', coins)

    /* Validate coins. */
    if (!coins) {
        // return
    }

    /* Build query. */
    const query = {
        v: 3,
        q: {
            find: {
                '$or': [
                    { 'in.e.a': this.address },
                    { 'out.e.a': this.address },
                ]
            }
        }
    }

    /* Request results. */
    const results = await Blockchain.Query.request(query)
    // const util = require('util')
    // console.log('INIT COINS (results):', util.inspect(results, false, null, true))

    /* Validate results. */
    if (results) {
        /* Initialize total confirmed. */
        let totalConfirmed = 0
        // const totalUnconfirmed = 0

        const unconfirmed = results.u
        // console.log('\nUNCONFIRMED', unconfirmed)

        const confirmed = results.c
        // console.log('\nCONFIRMED', confirmed)

        /* Handle transactions. */
        for (let i = 0; i < confirmed.length; i++) {
            /* Set transaction. */
            const tx = confirmed[i]

            /* Set transaction id. */
            const txid = tx.tx.h

            /* Set outputs. */
            const outputs = tx.out

            /* Handle outputs. */
            for (let j = 0; j < outputs.length; j++) {
                /* Set output. */
                const output = outputs[j]

                /* Set address. */
                const address = output.e.a

                /* Validate address. */
                if (address === this.address) {
                    /* Set cash address. */
                    const cashAddress = this.cashAddress

                    /* Set legacy address. */
                    const legacyAddress = this.legacyAddress

                    /* Set satoshis. */
                    const satoshis = output.e.v

                    /* Add value. */
                    totalConfirmed += satoshis

                    /* Set vout. */
                    const vout = output.e.i

                    /* Set outpoint. */
                    const outpoint = `${txid}:${vout}`

                    /* Set WIF. */
                    const wif = this._wif

                    /* Build coin package. */
                    const coin = {
                        cashAddress,
                        isLocked: false,
                        isSpent: false,
                        legacyAddress,
                        meta: {
                            comments: null,
                            title: null,
                        },
                        satoshis,
                        txid,
                        vout,
                        wif,
                    }
                    // console.log('\nCOIN', outpoint, coin)

                    /* Update coins. */
                    this._coins[outpoint] = coin

                }
            }
        }

        /* Handle transactions. */
        for (let i = 0; i < confirmed.length; i++) {
            /* Set transaction. */
            const tx = confirmed[i]

            /* Set transaction id. */
            // const txid = tx.tx.h

            /* Set inputs. */
            const inputs = tx.in

            /* Handle inputs. */
            for (let j = 0; j < inputs.length; j++) {
                /* Set input. */
                const input = inputs[j]

                /* Set address. */
                const address = input.e.a

                /* Validate address. */
                if (address === this.address) {
                    // console.log('\nINPUT', util.inspect(input, false, null, true))

                    /* Set transaction id. */
                    const txid = input.e.h

                    /* Set vout. */
                    const vout = input.e.i

                    /* Set outpoint. */
                    const outpoint = `${txid}:${vout}`
                    // console.log('\nSEARCHING (outpoint):', outpoint)
                    // console.log('\nSEARCHING MATCH:', this._coins[outpoint])

                    /* Validate (coin) outpoint. */
                    if (this._coins[outpoint]) {
                        /* Sent spent flag. */
                        this._coins[outpoint].isSpent = true
                    }

                }
            }
        }

        this._confirmed = totalConfirmed
        console.log('\nthis.confirmed', totalConfirmed, this._confirmed)

        /* Emit ready. */
        this.emit('ready', this._coins)

    }

    /* Update status. */
    // _updateStatus(coins)

    // /* Build search array. */
    // const addresses = accounts.map(obj => {
    //     return obj.address
    // })
    // // console.log('UPDATE COINS (addresses)', addresses)
    //
    // /* Initialize search details. */
    // const searchDetails = []
    //
    // /* Compile addresses. */
    // // FIXME: We do not use for-each with callback here because of async.
    // for (let i = 0; i < addresses.length; i++) {
    //     const address = addresses[i]
    //
    //     /* Retrieve address details. */
    //     const details = await Nito.Address.details(address)
    //     // console.log('UPDATE COINS (address details)', details)
    //
    //     /* Validate details. */
    //     if (!details) {
    //         return
    //     }
    //
    //     /* Map transactions. */
    //     const transactions = details.map(detail => {
    //         return detail.tx_hash
    //     })
    //     // console.log('UPDATE COINS (transactions)', transactions)
    //
    //     searchDetails.push({
    //         transactions,
    //         legacyAddress: Nito.Address.toLegacyAddress(address),
    //         cashAddress: address,
    //     })
    //     // console.log('UPDATE COINS (searchDetails)', searchDetails)
    // }
    //
    // /* Process search details. */
    // searchDetails.forEach(addrDetails => {
    //     const searchAddress = addrDetails.cashAddress
    //     // console.log('UPDATE COINS (searchAddress)', searchAddress)
    //
    //     const txs = addrDetails.transactions
    //     // console.log('UPDATE COINS (addrDetails.txs)', txs)
    //
    //     txs.forEach(async txid => {
    //         /* Retrieve transaction details. */
    //         const txDetails = await Nito.Transaction.details(txid)
    //         // console.log('UPDATE COINS (tx details)', txDetails)
    //
    //         /* Set outputs. */
    //         const outputs = txDetails.outputs
    //
    //         /* Handle all transaction outputs. */
    //         outputs.forEach((output, vout) => {
    //             // console.log('UPDATE COINS (output)', output)
    //
    //             /* Set satoshi (amount). */
    //             const satoshis = output.satoshis
    //             // console.log('UPDATE COINS (satoshis)', satoshis)
    //
    //             /* Set script public key. */
    //             const scriptPubKey = output.script
    //
    //             /* Validate script. */
    //             if (!scriptPubKey) {
    //                 return
    //             }
    //
    //             /* Set cash addresses. */
    //             const cashAddress = Nito.Address.toCashAddress(scriptPubKey)
    //             console.log('UPDATE COINS (cashAddress)', cashAddress, searchAddress)
    //
    //             /* Initialize chain id. */
    //             let chainid = null
    //
    //             /* Initialize WIF. */
    //             let wif = null
    //
    //             /* Find account. */
    //             const account = getters.getAccounts.find(account => {
    //                 return account.address === searchAddress
    //             })
    //             // console.log('ACCOUNT', account)
    //
    //             /* Validate account. */
    //             if (account) {
    //                 /* Set chain id. */
    //                 chainid = account.chainid
    //
    //                 /* Set WIF. */
    //                 wif = account.wif
    //             }
    //
    //             /* Validate search address. */
    //             // if (cashAddress.includes(searchAddress)) {
    //             if (cashAddress === searchAddress) {
    //                 /* Set status. */
    //                 const status = 'active'
    //
    //                 /* Set legacy address. */
    //                 const legacyAddress = Nito.Address
    //                     .toLegacyAddress(cashAddress)
    //
    //                 /**
    //                  * Coin
    //                  *
    //                  * Status codes:
    //                  *     active: Coin is ready to receive OR spend funds.
    //                  *     disabled: Already received and spent funds (MUST be empty).
    //                  *     locked: Coin is reserved OR has received funds currently
    //                  *             being held in reserve for a later use.
    //                  *             (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
    //                  */
    //                 const coin = {
    //                     status,
    //                     txid,
    //                     vout,
    //                     satoshis,
    //                     wif,
    //                     cashAddress,
    //                     legacyAddress,
    //                 }
    //                 console.log('UPDATE COINS (coin)', coin)
    //
    //                 /* Set coin id. */
    //                 const coinid = `${coin.txid}:${coin.vout}`
    //
    //                 /* Validate new coin. */
    //                 if (!coins[coinid]) {
    //                     /* Create coin package. */
    //                     const pkg = {
    //                         chainid,
    //                         coin,
    //                     }
    //
    //                     /* Add new coin. */
    //                     dispatch('addCoin', pkg)
    //                 } else {
    //                     // console.error('Coin already exists in the purse.')
    //                 }
    //             }
    //
    //         }) // outputs.forEach()
    //
    //     }) // txs.forEach()
    //
    // }) // searchDetails.forEach()

}

/* Export module. */
module.exports = initCoins
