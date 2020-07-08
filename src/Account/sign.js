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

    /* Return signature. */
    return signature
}

/* Export module. */
module.exports = sign
