/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:blender:gettxandsignature')

/**
 * Get Transaction and Signature
 *
 * Builds the partially signed transaction that will eventually be broadcast
 * to the the network.
 *
 * It returns a serialized (as JSON) version of the transaction before any
 * signatures are added as well as the fully formed transaction with only our
 * signature applied.
 *
 * Options model:
 *   - inputs
 *       - outputIndex
 *       - player
 *           - coin
 *               - publicKey
 *               - wif
 *           - isMe
 *       - prevTxId
 *       - satoshis
 *       - txid
 *       - vout
 *   - outputs
 *       - cashAddress
 *       - legacyAddress
 *       - satoshis
 */
const getTxAndSignature = function (_options) {
    debug('Get Shuffle Tx and Signature (options):', _options)

    /* Set inputs. */
    const inputs = _options.inputs

    /* Set outputs. */
    const outputs = _options.outputs

    /* Set shuffle transaction. */
    const blenderTransaction = new bch.Transaction()

    /* Initialize my input. */
    let myInput

    /* Loop through ALL inputs. */
    for (let _input of inputs) {
        /* Set player public key. */
        const playerPubKey = bch.PublicKey(_input.player.coin.publicKey)

        /* Set txid. */
        const txid = _input.txid

        /* Set output index. */
        const outputIndex = _input.vout

        /* Set address. */
        const address = playerPubKey.toAddress()

        /* Set script public key. */
        const scriptPubKey = bch.Script.fromAddress(address)

        /* Set satoshis. */
        const satoshis = _input.satoshis

        /* Set transaction input. */
        const txInput = new bch.Transaction.UnspentOutput({
            txid,
            outputIndex,
            address,
            scriptPubKey,
            satoshis,
        })
        debug('Transaction input:', txInput)

        /* Set shuffle transaction. */
        blenderTransaction.from(txInput)

        // WARNING: For some stupid reason, bitcoincashjs's `PublicKeyHashInput`
        //          instances are showing the outputIndex field which should be
        //          type number or string as type 'undefined'.
        //          Idfk, just be aware.
        const grabIt = blenderTransaction.inputs.find(txInput => {
            /* Set buffer string. */
            const bufferString = txInput.prevTxId.toString('hex')

            // ??
            return _input.txid === bufferString && Number(_input.vout) === Number(txInput.outputIndex)
        })

        /* Fix the sequence number. */
        Object.assign(grabIt, { sequenceNumber: 0xfffffffe })

        /* Add public key to input's script. */
        grabIt.setScript(bch.Script('21' + _input.player.coin.publicKey))

        /* Validate our input. */
        if (_input.player.isMe) {
            debug('_input.player.isMe:', _input)
            myInput = _input
        }
    }

    /* Loop through ALL outputs. */
    for (let _output of outputs) {
        debug('Shuffle transaction (_output)',
            _output,
            'legacyAddress', _output.legacyAddress,
            'cashAddress', _output.cashAddress,
            'satoshis', _output.satoshis
        )

        /* Set output (receiver). */
        blenderTransaction.to(_output.cashAddress, _output.satoshis)
    }

    /* Set version 2. */
    // NOTE: CashShuffle transactions use v1.
    blenderTransaction.setVersion(2)

    /* Set pre-signed transaction. */
    const preSignedTx = blenderTransaction.toObject()
    debug('Get shuffle transaction and signature (preSignedTx):', preSignedTx)

    /* Sign transaction. */
    blenderTransaction.sign(
        new bch.PrivateKey.fromWIF(myInput.player.coin.wif)
    )

    /* Set signature instance. */
    const sigInstance = blenderTransaction
        .getSignatures(myInput.player.coin.wif)[0]
    // debug('Signature instance:', sigInstance)

    /* Set serialized. */
    const serialized = preSignedTx

    /* Set transaction. */
    const tx = blenderTransaction

    /* Set signature. */
    const signature = sigInstance.signature.toTxFormat().toString('hex')

    /* Return transaction / signature package. */
    return {
        serialized,
        tx,
        signature,
    }
}

/* Export module. */
module.exports = getTxAndSignature
