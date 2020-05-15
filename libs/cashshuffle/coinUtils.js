/* Import core modules. */
const _ = require('lodash')
const bch = require('bitcore-lib-cash')
const debug = require('debug')('cashshuffle:utils')

/* Import BITBOX. */
const BITBOX = require('bitbox-sdk').BITBOX
const bitbox = new BITBOX()

/* Import local modules. */
// const Message = require('./BetterMessage.js')

// const Transaction = bch.Transaction
// const Address = bch.Address
// const Script = bch.Script
// const crypto = bch.crypto
const PublicKey = bch.PublicKey
const PrivateKey = bch.PrivateKey

/* Set dust threshold. */
const dustThreshold = 546

/**
 * Get Keypair from WIF
 */
const getKeypairFromWif = function (somePrivateKeyWif) {
    /* Initialize coin. */
    const coin = {}

    /* Set private key. */
    coin.privateKey = new PrivateKey(somePrivateKeyWif)

    /* Set public key. */
    coin.publicKey = coin.privateKey.toPublicKey()

    /* Set cash address. */
    // coin.cashAddress = coin.publicKey.toAddress()._toStringCashAddr()
    coin.cashAddress = coin.publicKey.toAddress().toString()
    debug('Get keypair from WIF (cashAddress):', coin.cashAddress)

    /* Set legacy address. */
    // coin.legacyAddress = coin.publicKey.toAddress().toString()
    coin.legacyAddress = bitbox.Address.toLegacyAddress(coin.cashAddress)
    debug('Get keypair from WIF (legacyAddress):', coin.legacyAddress)

    /* Return coin. */
    return coin
}

/**
 * Check Sufficient Funds
 */
const checkSufficientFunds = function (inputs, amount) {
    debug('Funds verification (amount):', amount)
    // Currently this is done in the `getCoinDetails` function
    // and it's called just before we add the player to the round.
    // It's also done as we're building the shuffle transaction.
    // I want to break this functionality out so we can check from
    // any time.
}

/**
 * Get Coin Details
 */
const getCoinDetails = async function (someTxid, someVout) {
    /* Initialize transaction data. */
    let txData

    try {
        txData = await bitbox.RawTransactions
            .getRawTransaction(someTxid, true)
    } catch (nope) {
        console.error('Something went wrong fetching transaction data') // eslint-disable-line no-console
        throw new Error('BAD_COIN')
    }

    /* Set coin in question. */
    const coinInQuestion = _.find(txData.vout, {
        n: Number(someVout)
    })

    /* Validate coin in question. */
    if (!coinInQuestion) {
        throw new Error('BAD_COIN')
    }

    /* Initialize UTXO data. */
    let utxoData

    try {
        utxoData = await bitbox.Address
            .utxo(coinInQuestion.scriptPubKey.addresses[0])
    } catch (nope) {
        console.error('Something went wrong fetching utxo data:', nope.message) // eslint-disable-line no-console
        throw new Error('BAD_COIN')
    }

    /* Set output in question. */
    const outputInQuestion = _.find(utxoData.utxos, {
        vout: Number(someVout),
        txid: someTxid
    })

    /* Set coin data. */
    const coinData = {
        txid: someTxid,
        vout: Number(someVout),
        legacyAddress: bitbox.Address
            .toLegacyAddress(coinInQuestion.scriptPubKey.addresses[0]),
        cashAddress: bitbox.Address
            .toCashAddress(coinInQuestion.scriptPubKey.addresses[0]),
        script: coinInQuestion.scriptPubKey.hex,
        spent: !outputInQuestion
    }
    // debug('Coin data:', coinData)

    /* Validate output in question. */
    if (outputInQuestion) {
        _.extend(coinData, {
            amount: outputInQuestion.amount,
            amountSatoshis: Number(outputInQuestion.satoshis),
            height: outputInQuestion.height,
            confirmations: outputInQuestion.confirmations
        })
    }

    /* Return coin data. */
    return coinData
}

/**
 * Verify Transaction Signature
 */
const verifyTransactionSignature = function (
    shuffleTxInstance, inputSigData, publicKeyHexOfSigner
) {
    // debug('Verify transaction signature',
    //     'shuffleTxInstance', shuffleTxInstance,
    //     'inputSigData', inputSigData,
    //     'publicKeyHexOfSigner', publicKeyHexOfSigner
    // )

    /* Set input to sign. */
    const inputToSign = _.reduce(
        shuffleTxInstance.inputs, function (keeper, oneInput, arrayIndex) {
            // If we already found the right input, pass it through
            // without bothering to check the others;
            if (keeper) {
                return keeper
            }

            const asJson = oneInput.toObject()

            if (inputSigData.prevTxId === asJson.prevTxId && Number(inputSigData.vout) === Number(asJson.outputIndex)) {
                return {
                    input: oneInput,
                    inputIndex: arrayIndex
                }
            } else {
                return undefined
            }
        }, undefined)
    // debug('Input to sign:', inputToSign)

    /* Validate input to sign. */
    if (!inputToSign) {
        return false
    }

    /* Set signer public key. */
    const signerPublicKey = bch.PublicKey(publicKeyHexOfSigner)

    /* Set signature instance. */
    const signatureInstance = bch.crypto.Signature
        .fromTxFormat(Buffer.from(inputSigData.signature, 'hex'))
    // debug('Signature instance:', signatureInstance)

    /* Set signature object. */
    const signatureObject = {
        signature: signatureInstance,
        publicKey: signerPublicKey,
        inputIndex: inputToSign.inputIndex,
        sigtype: signatureInstance.nhashtype
    }
    // debug('Signature object:', signatureObject)

    /* Initialize verification results. */
    let verificationResults = false

    try {
        verificationResults = inputToSign.input
            .isValidSignature(shuffleTxInstance, signatureObject)
    } catch (nope) {
        console.error(nope) // eslint-disable-line no-console
        verificationResults = false
    }
    // debug('Verification results:', verificationResults)

    /* Validate verification results. */
    if (verificationResults) {
        return {
            success: true,
            inputIndex: signatureObject.inputIndex,
            signature: signatureObject
        }
    } else {
        return {
            success: false
        }
    }
}

/**
 * Prepare Shuffle Ins and Outs
 *
 * Normalizes and sorts all the transaction inputs and outputs so the
 * transaction building logic can be kept clean and simple.
 *
 * This function also makes sure inputs haven't been spent
 * since they were declared.
 */
const prepareShuffleInsAndOuts = async function (options) {
    /* Set fee (in satoshis). */
    const feeSatoshis = options.feeSatoshis

    /* Initialize shuffle amount (satoshis). */
    // NOTE: If this field is left blank, it will be set later
    //       to the lowest valued coin - fees.
    let shuffleAmountSatoshis = options.shuffleAmountSatoshis

    /* Attach the players input address to their input. */
    const players = options.players.map((onePlayer) => {
        /* Set public key. */
        const pubKey = new PublicKey(onePlayer.coin.publicKey)

        /* Update player data. */
        _.extend(onePlayer.coin, {
            vout: Number(onePlayer.coin.vout),
            pubKey: pubKey,
            legacyAddress: bitbox.Address.toLegacyAddress(pubKey.toAddress().toString()),
            cashAddress: pubKey.toAddress().toString()
        })
        // debug('One player:', onePlayer)

        /* Return player. */
        return onePlayer
    })
    debug('Preparing to shuffle ins and outs (players):', players)

    /* Set address to fetch. */
    const addressesToFetch = players.map(obj => obj['coin']['legacyAddress'])
    // debug('Address to fetch:', addressesToFetch)

    /* Initialize UTXO data. */
    let utxoData

    try {
        utxoData = await bitbox.Address
            .utxo(addressesToFetch)
    } catch (nope) {
        console.error('Something went wrong fetching utxo data:', nope) // eslint-disable-line no-console
        throw nope
    }
    // debug('UXTO data:', utxoData)

    /* Initialize ALL inputs. */
    const allInputs = []

    /* Loop through ALL players. */
    // NOTE: Sorted by transaction id, and output index.
    for (let onePlayer of _.orderBy(players, ['coin.txid', 'coin.vout'], ['asc', 'asc'])) {
        /* Set address in question. */
        const addressInQuestion = _.find(utxoData, {
            legacyAddress: onePlayer.coin.legacyAddress
        })
        // debug('Address in question:', addressInQuestion, onePlayer.coin.legacyAddress)

        /* Validate address in question. */
        if (!addressInQuestion) {
            /* Set error. */
            const errorToThrow = new Error('VERIFY_ERROR')

            /* Update error. */
            _.extend(errorToThrow, {
                blame: {
                    reason: 'BAD_INPUT',
                    player: onePlayer
                }
            })

            // debug('Player (coin):', onePlayer.coin)
            // debug('Player (change):', onePlayer.change)
            // debug('Player (finalOutputAddresses):', onePlayer.finalOutputAddresses)

            throw errorToThrow
        }

        /* Set coin in question. */
        const coinInQuestion = _.find(addressInQuestion.utxos, {
            txid: onePlayer.coin.txid,
            vout: onePlayer.coin.vout
        })

        /* Validate coin in question. */
        if (!coinInQuestion) {
            let errorToThrow = new Error('VERIFY_ERROR')

            _.extend(errorToThrow, {
                blame: {
                    reason: 'BAD_INPUT',
                    player: onePlayer
                }
            })

            throw errorToThrow
        }

        /* Add to ALL inputs. */
        allInputs.push({
            player: _.cloneDeep(onePlayer),
            txid: onePlayer.coin.txid,

            // The output order of this coin inside it's
            // previous transaction.  The old index.
            vout: Number(onePlayer.coin.vout),

            // The order in which this coin will be included
            // in the transaction we're building now. This is
            // it's input index.  We will order by this.
            vin: allInputs.length,
            legacyAddress: addressInQuestion.legacyAddress,
            cashAddress: addressInQuestion.cashAddress,
            amountBch: coinInQuestion.amount,
            amountSatoshis: coinInQuestion.satoshis,
            confirmations: coinInQuestion.confirmations,
            scriptPubKey: addressInQuestion.scriptPubKey
        })
    }

    /* Validate shuffle amount (satoshis). */
    // NOTE: Dynamically set the shuffleAmount if it wasn't
    //       specified as an argument to this function.
    if (!shuffleAmountSatoshis) {
        shuffleAmountSatoshis = _.minBy(
            allInputs, 'amountSatoshis')['amountSatoshis'] - feeSatoshis
    }

    /* Set final output addresses. */
    const finalOutputAddresses = players[0].finalOutputAddresses

    /* Initialize all output. */
    // NOTE: Outputs are in the order they arrived in the packets.
    const allOutputs = []

    /* Loop through ALL final output addresses. */
    for (let n = 0; n < finalOutputAddresses.length; n++) {
        allOutputs.push({
            vout: n,
            legacyAddress: finalOutputAddresses[n],
            cashAddress: bitbox.Address.toCashAddress(finalOutputAddresses[n]),
            amountSatoshis: shuffleAmountSatoshis
        })
    }

    /* Set change exclusion address. */
    // NOTE: Since the shuffle amount (according to CashShuffle v300 spec)
    //       is set to the smallest coin value minus fees within the round,
    //       this player won't get change.
    const changeAddressToExclude = _.get(
        _.minBy(allInputs, 'amountSatoshis'), 'player.change.legacyAddress')

    /* Set change outputs to add. */
    const changeOutputsToAdd = _.reduce(players, function (keepers, onePlayer) {
        if (onePlayer.change.legacyAddress !== changeAddressToExclude) {
            /* Set player input. */
            const playerInput = _.find(
                allInputs, { legacyAddress: onePlayer.coin.legacyAddress })

            /* Add output to keepers. */
            keepers.push({
                player: onePlayer,
                verificationKey: onePlayer.verificationKey,
                legacyAddress: onePlayer.change.legacyAddress,
                cashAddress: bitbox.Address.toCashAddress(onePlayer.change.legacyAddress),
                amountSatoshis: playerInput.amountSatoshis - (shuffleAmountSatoshis + feeSatoshis)
            })
        }

        /* Return keepers. */
        return keepers
    }, [])

    /* Loop through ALL change outputs. */
    // NOTE: Order the change amounts based on their verification
    //       key then add them to the outputs array.
    for (let oneOutput of _.orderBy(changeOutputsToAdd, ['verificationKey'], ['asc'])) {
        if (oneOutput.amountSatoshis >= dustThreshold) {
            allOutputs.push(_.extend(oneOutput, { vout: allOutputs.length }))
        }
    }

    /* Return complete shuffle package. */
    return {
        inputs: _.orderBy(allInputs, ['vin'], ['asc']),
        outputs: _.orderBy(allOutputs, ['vout'], ['asc']),
        shuffleAmountSatoshis,
        feeSatoshis,
        players
    }
}

/**
 * Get Shuffle Transaction and Signature
 *
 * Builds the partially signed transaction that will eventually be broadcast
 * to the the network.
 *
 * It returns a serialized (as JSON ) version of the transaction before any
 * signatures are added as well as the fully formed transaction with only our
 * signature applied.
 */
const getShuffleTxAndSignature = function (options) {
    // debug('Get Shuffle Tx and Signature (options):', options)

    /* Set inputs. */
    const inputs = options.inputs

    /* Set outputs. */
    const outputs = options.outputs

    /* Set shuffle transaction. */
    const shuffleTransaction = new bch.Transaction()

    /* Initialize my input. */
    let myInput

    /* Loop through ALL inputs. */
    for (let oneInput of inputs) {
        /* Set player public key. */
        const playerPubKey = bch.PublicKey(oneInput.player.coin.publicKey)

        /* Set transaction input. */
        const txInput = new bch.Transaction.UnspentOutput({
            txid: oneInput.txid,
            outputIndex: oneInput.vout,
            address: playerPubKey.toAddress(),
            scriptPubKey: bch.Script.fromAddress(playerPubKey.toAddress()),
            satoshis: oneInput.amountSatoshis
        })
        debug('Transaction input:', txInput)

        /* Set shuffle transaction. */
        shuffleTransaction.from(txInput)

        // WARNING: For some stupid reason, bitcoincashjs's `PublicKeyHashInput`
        //          instances are showing the outputIndex field which should be
        //          type number or string as type 'undefined'.
        //          Idfk, just be aware.
        const grabIt = _.find(shuffleTransaction.inputs, function (txInput) {
            /* Set buffer string. */
            const bufferString = txInput.prevTxId.toString('hex')

            return oneInput.txid === bufferString && Number(oneInput.vout) === Number(txInput.outputIndex)
        })

        /* Fix the sequence number. */
        _.extend(grabIt, { sequenceNumber: 0xfffffffe })

        /* Add public key to input's script. */
        grabIt.setScript(bch.Script('21' + oneInput.player.coin.publicKey))

        /* Validate our input. */
        if (oneInput.player.isMe) {
            // debug('My (oneInput):', oneInput)
            myInput = oneInput
        }
    }

    /* Loop through ALL outputs. */
    for (let oneOutput of outputs) {
        // debug('Shuffle transaction (oneOutput)',
        //     oneOutput,
        //     'legacyAddress', oneOutput.legacyAddress,
        //     'cashAddress', oneOutput.cashAddress,
        //     'amountSatoshis', oneOutput.amountSatoshis
        // )
        shuffleTransaction.to(oneOutput.cashAddress, oneOutput.amountSatoshis)
    }

    /* Set version 1. */
    shuffleTransaction.setVersion(1)

    /* Set pre-signed transaction. */
    const preSignedTx = shuffleTransaction.toObject()
    debug('Get shuffle transaction and signature (preSignedTx):', preSignedTx)

    /* Sign transaction. */
    shuffleTransaction.sign(
        new bch.PrivateKey.fromWIF(myInput.player.coin.privateKeyWif))

    /* Set signature instance. */
    const sigInstance = shuffleTransaction
        .getSignatures(myInput.player.coin.privateKeyWif)[0]
    // debug('Signature instance:', sigInstance)

    /* Return transaction / signature package. */
    return {
        serialized: preSignedTx,
        tx: shuffleTransaction,
        signature: sigInstance.signature.toTxFormat().toString('hex')
    }
}

/**
 * Build Shuffle Transaction
 *
 * NOTE: FOR DEVELOPMENT PURPOSE ONLY
 *       ----------------------------
 *       An intermediary function, used to switch between the different
 *       transaction building methods currently being evaluated.
 */
const buildShuffleTransaction = async function (options) {
    // debug('Build shuffle transaction (options):', options)
    /* Initialize ins and outs. */
    let insAndOuts

    try {
        insAndOuts = await this.prepareShuffleInsAndOuts({
            players: options.players,
            feeSatoshis: options.feeSatoshis
        })
    } catch (nope) {
        console.error('cannot prepare inputs and outputs for shuffle Transaction') // eslint-disable-line no-console
        throw nope
    }
    debug('Build shuffle transaction (insAndOuts):', insAndOuts)

    /* Set shuffle transaction data. */
    const shuffleTxData = await this.getShuffleTxAndSignature({
        inputs: insAndOuts.inputs,
        outputs: insAndOuts.outputs
    })
    debug('Build shuffle transaction (shuffleTxData):', shuffleTxData)

    /* Return the results. */
    return {
        tx: shuffleTxData.tx,
        inputs: insAndOuts.inputs,
        outputs: insAndOuts.outputs,
        serialized: shuffleTxData.serialized,
        signatureBase64: Buffer
            .from(shuffleTxData.signature, 'utf-8')
            .toString('base64')
    }
}

/* Export module. */
module.exports = {
    bitbox,
    getKeypairFromWif,
    checkSufficientFunds,
    getCoinDetails,
    verifyTransactionSignature,
    prepareShuffleInsAndOuts,
    getShuffleTxAndSignature,
    buildShuffleTransaction
}
