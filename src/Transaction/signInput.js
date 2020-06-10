/* Import modules. */
const debug = require('debug')('nitojs:transaction:signinput')

/* Initialize BITBOX. */
const bitbox = new window.BITBOX() // eslint-disable-line no-undef

/**
 * Sign an Input
 *
 * 1. _txBuilder: Requires an instance of BITBOX transaction builder.
 * 2. _wif: Wallet import format of private key.
 * 3. _satoshis: Original coin value.
 * 4. _inputIdx: Position of input within transaction.
 */
const signInput = function (_txBuilder, _wif, _satoshis, _inputIdx) {
    /* Set transaction builder. */
    const txBuilder = _txBuilder

    /* Set keypair. */
    const keyPair = bitbox.ECPair.fromWIF(_wif)

    /* Set transaction amount (in satoshis). */
    const satoshis = parseInt(_satoshis)

    /* Set (input) index. */
    const inputIdx = parseInt(_inputIdx)

    /* Initialize redeemscript. */
    // TODO: Find out WHY the hell we need this here??
    let redeemScript
    debug('Redeem script (before signing):', redeemScript)

    /* Sign the transaction input (inputIdx). */
    txBuilder.sign(
        inputIdx,
        keyPair,
        redeemScript,
        txBuilder.hashTypes.SIGHASH_ALL,
        satoshis,
        txBuilder.signatureAlgorithms.SCHNORR
    )

    debug('Redeem script (after signing):', redeemScript)
}

/* Export module. */
module.exports = signInput
