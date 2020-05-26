const debug = require('debug')('nitojs:transaction:sendcoin')

/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/* Set dust (amount) satoshis. */
const DUST_SATOSHIS = 546

/* Import (local) modules. */
const signInput = require('./signInput')

/**
 * Send Coin
 *
 * Simple coin sending to one or more receipients.
 */
const sendCoin = async (_coin, _outs, _doValidation=false) => {
    debug('Sending coin', _coin, _outs)

    /* Initialize transaction builder. */
    const transactionBuilder = new bitbox.TransactionBuilder('mainnet')

    /* Set locktime (for immediate propagation). */
    transactionBuilder.setLockTime(0)

    /* Set satoshis. */
    // NOTE: Value is in satoshis.
    const satoshis = parseFloat(_coin.satoshis)

    /* Validate satoshis (sending to receiver). */
    if (!satoshis) {
        return console.error('displayError',
            'Cannot send coin without satoshis', { root: true })
    }

    try {
        /* Initialize (minimum) byte count. */
        // let byteCount = 226
        const byteCount = bitbox.BitcoinCash
            .getByteCount({ P2PKH: 1 }, { P2PKH: _outs.length })
        debug('Byte count:', byteCount)

        /* Initialize (initial) transaction satoshis. */
        // NOTE: It's the original satoshis - 1 sat/byte for tx size
        // FIXME: Recommendation is to use 1.1 sat/byte
        const txAmount = satoshis - byteCount
        debug('Transaction satoshis (incl. bytes):', txAmount)

        /* Validate send satoshis. */
        // TODO: Validate BCH dust satoshis.
        if (_doValidation && txAmount < DUST_SATOSHIS) {
            /* Display error. */
            console.error('displayError',
                `Amount is too low. Min: ${DUST_SATOSHIS} sats`, { root: true })

            /* Set flag. */
            // FIXME: How can we display this on the UI?
            // this.sendState = 'idle'

            return
        }

        /**
         * Add Input
         *
         * Add input with txid and index of vout.
         */
        transactionBuilder.addInput(_coin.txid, _coin.vout)

        /**
         * Add Outputs
         */
        _outs.forEach(out => {
            /* Add output w/ address and satoshis to send. */
            transactionBuilder.addOutput(out.receiver, out.satoshis)
        })

        /* Sign input. */
        signInput(transactionBuilder, _coin.wif, _coin.satoshis, 0)

        /* Build transaction. */
        const tx = transactionBuilder.build()
        debug('Transaction builder (build):', tx)

        /* Set tx output to raw hex. */
        const rawTx = tx.toHex()
        console.info('\nRaw transaction (hex):', rawTx) // eslint-disable-line no-console

        /* Set state. */
        // this.sendState = 'sending'

        /* Broadcast transaction to network. */
        const result = await bitbox.RawTransactions
            .sendRawTransaction(rawTx)
            .catch(err => console.error(err)) // eslint-disable-line no-console

        return result
            // .then(
            //     (result) => {
            //         debug('sendRawTransaction (result):', result)
            //         console.info('sendRawTransaction (result):', result) // eslint-disable-line no-console
            //
            //         /* Increment receiving wallet (index). */
            //         // FIXME: Verify that a change coins was used.
            //         // dispatch('updateAccounts', {
            //         //     action: 'disable',
            //         //     indexes: coinsIndexes,
            //         //     wallet: 'BCH',
            //         // })
            //
            //         /* Display notification. */
            //         // dispatch('displayNotification',
            //         //     'Sent successfully!', { root: true })
            //
            //         /* Set flag. */
            //         // this.sendState = 'idle'
            //     },
            //     (err) => {
            //         console.error('TX SEND ERROR:', err) // eslint-disable-line no-console
            //
            //         /* Validate error. */
            //         if (err && err.error && err.error.includes('insufficient priority')) {
            //             return console.error('displayError',
            //                 `Blockchain fee is too low (${amount} sats)`,
            //                 { root: true })
            //         }
            //
            //         /* Display error. */
            //         console.error('displayError',
            //             err.message ? err.message.split(';')[0] : err, { root: true })
            //
            //         /* Set flag. */
            //         // this.sendState = 'idle'
            //     }
            // )
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Display error. */
        console.error('displayError',
            err.message ? err.message.split(';')[0] : err, { root: true })

        /* Set flag. */
        // FIXME: Add this to the `system` module.
        // this.sendState = 'idle'

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
module.exports = sendCoin
