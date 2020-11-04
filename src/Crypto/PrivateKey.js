/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:crypto:privatekey')

/**
 * Private Key
 */
const privateKey = (_node) => {
    debug(`Generating private key for [ ${_node} ]`)

    /* Validate node. */
    if (typeof _node === 'undefined') {
        return bch.PrivateKey
        // throw new Error('Invalid node.')
    }

    /* Validate private key. */
    if (_node.privateKey) {
        return new bch.PrivateKey(_node.privateKey)
    } else {
        return new bch.PrivateKey(_node)
    }
}

/* Export module. */
module.exports = privateKey
