/* Import modules. */
const Nito = require('nitojs')

/**
 * Get Address by Session Id
 *
 * Returns the next avaialble "receiving" account, for the session.
 */
const getAddressBySessionId = (state, getters) => (_sessionid) => {
    // console.log('GET ADDRESS BY SESSION (sessionid)', _sessionid)
    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    // console.log('GET ADDRESS BY SESSION (sessions):', sessions)

    /* Initialize current (coin) index. */
    const currentIndex = sessions[_sessionid].accounts.deposit
    // console.log('GET ADDRESS BY SESSION (currentIndex):', currentIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = getters.getDerivationPath(_sessionid, chain, currentIndex)
    // console.log('GET ADDRESS BY SESSION (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (receiving) addresss. */
    const addresss = Nito.Address.toCashAddress(childNode)
    // console.log('GET ADDRESS BY SESSION (receiving addresss)', addresss)

    /* Return addresss. */
    return addresss
}

/* Export module. */
export default getAddressBySessionId
