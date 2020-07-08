/* Import modules. */
const bitcoin = require('bitcoinjs-lib')
const debug = require('debug')('nitojs:account:verify')

/**
 * Verify
 */
const verify = (_hash, _publicKey, _signature) => {
    debug(`Verifying [ ${_hash} ] for [ ${_publicKey} ] using [ ${_signature} ]`)

    /* Initialize key pair. */
    const keyPair = bitcoin.ECPair
        .fromPublicKey(Buffer.from(_publicKey, 'hex'))

    /* Parse signature. */
    // NOTE: Removes ALL encoding, leaving 32-byte `r` and `s` values.
    const signature = _signature.slice(8, 72) + _signature.slice(-64)

    /* Validate signature. */
    const isValid = keyPair.verify(
        Buffer.from(_hash, 'hex'),
        signature
    )

    /* Return verification. */
    return isValid
}

/* Export module. */
module.exports = verify
