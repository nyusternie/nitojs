/**
 * Address
 *
 * A shortened version of the cash adddress sans the "bitcoincash:" prefix.
 */
const cashAddress = function () {
    /* Set cash address. */
    const cashAddress = this.cashAddress

    /* Return address. */
    return cashAddress.slice(12)
}

/* Export module. */
module.exports = cashAddress
