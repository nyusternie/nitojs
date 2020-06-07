/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Load (Derivation) Path
 */
const loadPath = (_getters, _account, _sessionId, _chainId, _acctIdx) => {
    console.log('LOAD PATH', _sessionId, _chainId, _acctIdx)
    /* Initialize HD node. */
    const hdNode = _getters.getHDNode

    /* Set derivation path. */
    const path = _getters.getDerivationPath(_sessionId, _chainId, _acctIdx)
    // console.log('GET ACCOUNTS (path)', path)

    /* Initialize child node. */
    const childNode = hdNode.derivePath(path)

    /* Set WIF. */
    const wif = bitbox.HDNode.toWIF(childNode)

    /* Set account (address). */
    const address = bitbox.HDNode.toCashAddress(childNode)
    // console.log('GET ACCOUNTS (address)', address)

    /* Add to all receiving (pool). */
    _account.push({
        sessionId: _sessionId,
        chainId: _chainId,
        address,
        wif,
    })

}

/**
 * Get Account by Session Id
 *
 * Returns the full account for a session id. This will return coin details
 * (incl. index and WIF) for ALL derivation paths in-use for a session.
 */
const getAccountBySessionId = (state, getters) => (_sessionId) => {
    /* Initialize account. */
    const account = []

    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    console.log('GET ACCOUNT BY SESSION (sessions):', sessions)

    /* Set session. */
    const session = sessions[_sessionId]
    console.log('GET ACCOUNT BY SESSION (session):', session)

    /* Loop through ALL (deposit) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.deposit; i++) {
        loadPath(getters, account, _sessionId, 0, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.change; i++) {
        loadPath(getters, account, _sessionId, 1, i)
    }

    /* Loop through ALL (Nito Cash) indexes (inclusive). */
    for (let i = 0; i <= getters.getNitoCashIdx; i++) {
        loadPath(getters, account, 0, 7867, i)
    }

    /* Loop through ALL (Nito Xchg) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.xchg; i++) {
        loadPath(getters, account, _sessionId, 7888, i)
    }
    console.log('GET ACCOUNT BY SESSION (account):', account)

    /* Return accounts. */
    return account
}

/* Export module. */
export default getAccountBySessionId
