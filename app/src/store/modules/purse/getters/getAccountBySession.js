/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get Session Account
 *
 * Returns the next avaialble "receiving" account, for the session.
 */
const getAccount = (state, getters) => (_sessionId) => {
    // console.log('GET ACCOUNT BY SESSION (sessionid)', _sessionId)
    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    console.log('GET ACCOUNT (sessions):', sessions)

    /* Initialize current (coin) index. */
    const currentIndex = sessions[_sessionId].accounts.deposit
    console.log('GET ACCOUNT (currentIndex):', currentIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = getters.getDerivationPath(_sessionId, chain, currentIndex)
    console.log('GET ACCOUNT (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.derivePath(path)

    /* Set (receiving) account. */
    const account = bitbox.HDNode.toCashAddress(childNode)
    // console.log('GET ACCOUNT (receiving account)', account)

    /* Return account. */
    return account
}

/* Export module. */
export default getAccount
