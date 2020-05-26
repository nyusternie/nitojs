const debug = require('debug')('nitojs:transaction:signinput')

/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Sign an Input
 *
 * 1. _transactionBuilder: Requires an instance of BITBOX transaction builder.
 * 2. _wif: Wallet import format of private key.
 * 3. _satoshis: Original coin value.
 * 4. _inputIdx: Position of input within transaction.
 */
const signInput = () => (_transactionBuilder, _wif, _satoshis, _inputIdx) => {
    /* Set transaction builder. */
    const transactionBuilder = _transactionBuilder

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
    transactionBuilder.sign(
        inputIdx,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        satoshis,
        transactionBuilder.signatureAlgorithms.SCHNORR
    )

    debug('Redeem script (after signing):', redeemScript)
}

/* Export module. */
export default signInput
