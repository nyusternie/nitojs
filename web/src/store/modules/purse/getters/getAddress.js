/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
 * Get (Purse) Address
 *
 * Returns the next avaialble "receiving" (coin) address,
 * for the purse.
 */
const getAddress = (state, getters) => (_session) => {
    /* Validate coins. */
    if (!getters.getCoinsBySession(_session)) {
        return null
    }

    /* Initialize (purse) coins. */
    const purseCoins = getters.getCoinsBySession(_session)

    /* Initialize current (coin) index. */
    const currentIndex = Math.max(...Object.keys(purseCoins))

    // FIXME
    const change = 0

    /* Set derivation path. */
    const path = getters.getDerivationPath(_session, currentIndex)
    console.log('GET ADDRESS (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.derivePath(path)

    /* Set (receiving) address. */
    const address = bitbox.HDNode.toCashAddress(childNode)
    // console.log('GET ADDRESS (receiving address)', address)

    /* Return address. */
    return address
}

/* Export module. */
export default getAddress
