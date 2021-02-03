/* Import modules. */
const Address = require('..').Address
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:transaction:sendcoin')
const Transaction = require('.')

/* Set dust (amount) satoshis. */
const DUST_SATOSHIS = 546

/**
 * Send Coin
 *
 * Simple coin sending to one or more receipients.
 */
const sendCoin = async (_coin, _receivers, _autoFee) => {
    debug('Sending coin', _coin, _receivers)
    console.log('Sending coin', _coin, _receivers)

    /* Set address. */
    const address = _coin.cashAddress

    /* Set transaction id. */
    const txId = _coin.txid

    /* Set output index. */
    const outputIndex = _coin.vout

    /* Set satoshis. */
    const satoshis = _coin.satoshis

    /* Validate satoshis (sending to receiver). */
    if (!satoshis) {
        throw new Error('No transaction value.')
    }

    /* Set public key (hash) script. */
    const script = Address.toPubKeyHash(_coin.cashAddress)

    /* Initialize private key. */
    const privateKey = new bch.PrivateKey(_coin.wif)

    /* Build UTXO. */
    const utxo = { txId, outputIndex, address, script, satoshis }
    debug('Sending (utxo):', utxo)
    // console.log('SEND COIN (utxo):', utxo)

    /* Build transaction. */
    const transaction = new bch.Transaction()
        .from(utxo)

    /* Initialize (minimum) byte count. */
    // FIXME: We need to properly calculate the fee.
    //        Reference BITBOX `getByteCount` for method.
    // const byteCount = 226
    const byteCount = 270
    debug('Byte count:', byteCount)

    /* Initialize (initial) transaction satoshis. */
    // NOTE: It's the original satoshis - 1 sat/byte for tx size
    // FIXME: Recommendation is to use 1.1 sat/byte
    let txAmount = 0

    /* Handle all receivers. */
    _receivers.forEach(_receiver => {
        /* Set receipient address. */
        const address = _receiver.address

        /* Initialize satoshis. */
        let satoshis = null

        if (_autoFee) {
            /* Calculate fee per recipient. */
            // NOTE: Fee is split evenly between all recipients.
            const feePerRecipient = Math.ceil(byteCount / _receivers.length)

            /* Calculate satoshis. */
            satoshis = _receiver.satoshis - feePerRecipient

            /* Add receiver to transaction. */
            transaction.to(address, satoshis)
        } else {
            /* Set satoshis. */
            satoshis = _receiver.satoshis

            /* Add receiver to transaction. */
            transaction.to(address, satoshis)
        }

        /* Calculate transaction total. */
        txAmount += satoshis
    })
    debug('Transaction satoshis (incl. fee):', txAmount)

    /* Validate dust amount. */
    if (txAmount < DUST_SATOSHIS) {
        throw new Error(`Amount is too low. Minimum is [ ${DUST_SATOSHIS} ] satoshis.`)
    }

    /* Sign transaction. */
    transaction.sign(privateKey)
    debug('Raw transaction (hex):', transaction.toString())
    // console.info('Raw transaction:', transaction) // eslint-disable-line no-console
    // console.info('Raw transaction (hex):', ) // eslint-disable-line no-console

    /* Broadcast transaction to network. */
    return await Transaction
        .sendRawTransaction(transaction.toString())
        .catch(err => {
            console.error(err) // eslint-disable-line no-console
        })
}

/* Export module. */
module.exports = sendCoin
