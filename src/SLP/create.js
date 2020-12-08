/* Import modules. */
const debug = require('debug')('nitojs:slp:create')
const bitcore = require('bitcore-lib-cash')

/* Set dust amount. */
const DUST_AMOUNT = 546

/**
 * Create Token
 */
const create = (_params) => {
    debug(`Creating token with [ ${_params} ]`)

    const utxo = _params.utxo
    const publicKeys = _params.publicKeys
    const privateKeys = _params.privateKeys
    const reqNumSigs = _params.reqNumSigs
    const script = _params.script
    const ownerAddress = _params.ownerAddress
    const sendValue = _params.sendValue

    const transaction = new bitcore.Transaction()
    console.log('TRANSACTION', {transaction, utxo, publicKeys, reqNumSigs});
    transaction
        .from(utxo, publicKeys, reqNumSigs)
    // const transaction = new bitcore.Transaction()
    //     .from(utxo, publicKeys, reqNumSigs)
        .addOutput(new bitcore.Transaction.Output({
            script,
            satoshis: 0,
        }))
        .to(ownerAddress, DUST_AMOUNT) // (token) owner address
        .to(ownerAddress, DUST_AMOUNT) // (baton) owner address
        .to(ownerAddress, sendValue) // (change) receiver address
        .sign([privateKeys[0], privateKeys[1]])

    /* Return query response. */
    return transaction
}

/* Export module. */
module.exports = create
