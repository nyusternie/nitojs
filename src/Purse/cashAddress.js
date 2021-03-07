/**
 * Cash Address
 *
 * Retrieves the cash address for this node.
 */
const cashAddress = function () {
    /* Return cash address. */
    return this.node.toAddress().toString()
}

/* Export module. */
module.exports = cashAddress
