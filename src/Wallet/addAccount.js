/* Import modules. */
const debug = require('debug')('nitojs:address:addaccount')

/**
 * Add Account
 *
 * Retrieves an account from the current (wallet) node.
 *
 * NOTE: Requires a full derivation path, eg. `m/44'/145'/0'/0/0`.
 */
const addAccount = function (_path) {
    debug(`Retrieving account for [ ${_path} ]`)

    /* Initialize child node. */
    const childNode = this.node.deriveChild(_path)

    /* Return child node. */
    return childNode
}

/* Export module. */
module.exports = addAccount
