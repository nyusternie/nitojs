/* Import modules. */
const Address = require('../Address')

/**
 * Legacy Address
 *
 * Retrieves the legacy address for this node.
 */
const legacyAddress = function () {
    /* Return legacy address. */
    // FIXME: Can this be simplified??
    return Address.toLegacyAddress(this._node.toAddress().toString())
}

/* Export module. */
module.exports = legacyAddress
