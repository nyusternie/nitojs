/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
 * Get (Coin) Addresses
 *
 * Returns (addresses for) ALL (in-use) receiving coins.
 */
const getAddresses = (state, getters) => (_sessionId) => {
    /* Validate coins. */
    if (!getters.getCoinsBySession(_sessionId)) {
        return null
    }

    /* Initialize (session) coins. */
    const sessionCoins = getters.getCoinsBySession(_sessionId)

    /* Initialize addresses. */
    const addresses = []

    /* Add all active receiving account (addresses) to pool. */
    Object.keys(sessionCoins).forEach(index => {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        // FIXME
        const change = 0

        /* Set derivation path. */
        const path = getters.getDerivationPath(_sessionId, index)
        console.log('GET ADDRESSES (path)', path)

        /* Initialize child node. */
        const childNode = hdNode.derivePath(path)

        const address = bitbox.HDNode.toCashAddress(childNode)
        // console.log('GET ADDRESSES (address)', address)

        /* Add to all receiving (pool). */
        addresses.push({
            address,
            index
        })
    })

    /* Return addresses. */
    return addresses
}

/* Export module. */
export default getAddresses
