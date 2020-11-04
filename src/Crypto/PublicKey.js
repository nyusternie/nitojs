/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:crypto:publickey')

/**
 * Public Key
 */
const publicKey = (_node) => {
    debug(`Generating public key for [ ${_node} ]`)

    /* Validate node. */
    if (typeof _node === 'undefined') {
        return bch.PublicKey
        // throw new Error('Invalid node.')
    }

    /* Validate public key. */
    if (_node.publicKey) {
        return new bch.PublicKey(_node.publicKey)
    } else {
        return new bch.PublicKey(_node)
    }
}

/* Export module. */
module.exports = publicKey
