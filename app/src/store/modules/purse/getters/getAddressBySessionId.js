/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get Address by Session Id
 *
 * Returns the next avaialble "receiving" account, for the session.
 */
const getAddressBySessionId = (state, getters) => (_sessionId) => {
    // console.log('GET ADDRESS BY SESSION (sessionid)', _sessionId)
    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    // console.log('GET ADDRESS BY SESSION (sessions):', sessions)

    /* Initialize current (coin) index. */
    const currentIndex = sessions[_sessionId].accounts.deposit
    // console.log('GET ADDRESS BY SESSION (currentIndex):', currentIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = getters.getDerivationPath(_sessionId, chain, currentIndex)
    // console.log('GET ADDRESS BY SESSION (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (receiving) addresss. */
    const addresss = bitbox.HDNode.toCashAddress(childNode)
    // console.log('GET ADDRESS BY SESSION (receiving addresss)', addresss)

    /* Return addresss. */
    return addresss
}

/* Export module. */
export default getAddressBySessionId
