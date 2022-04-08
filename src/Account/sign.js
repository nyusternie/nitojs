/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:account:sign')

/**
 * Sign
 */
const sign = (_hash, _node) => {
    debug(`Signing [ ${_hash} ] with [ ${_node.privateKey} ]`)

    /* Generate signature. */
    const signature = bch.crypto.ECDSA
        .sign(_hash, _node)

    /* Initialize BITBOX node. */
    // NOTE: We currently have a bug in `bitcore-lib-cash` that is causing
    //       bn.js is throw an assert error.
    // const node = bitbox.ECPair.fromWIF(_node.toWIF())

    /* Generate signature. */
    // const signature = bitbox.ECPair.sign(node, _hash);

    /* Return signature. */
    return signature
}

/* Export module. */
module.exports = sign
