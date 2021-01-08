/* Import modules. */
const Nito = require('nitojs')

/**
 * Load (Derivation) Path
 */
const loadPath = (_getters, _account, _sessionid, _chainid, _acctIdx) => {
    /* Initialize HD node. */
    const hdNode = _getters.getHDNode

    /* Set derivation path. */
    const path = _getters.getDerivationPath(_sessionid, _chainid, _acctIdx)
    // console.log('GET ACCOUNTS (path)', path)

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set WIF. */
    const wif = childNode.privateKey.toWIF()

    /* Set account (address). */
    const address = Nito.Address.toCashAddress(childNode)
    // console.log('GET ACCOUNTS (address)', address)

    /* Add to all receiving (pool). */
    _account.push({
        sessionid: _sessionid,
        chainid: _chainid,
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
const getAccountBySessionid = (state, getters) => (_sessionid) => {
    /* Initialize account. */
    const account = []

    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    // console.log('GET ACCOUNT BY SESSION (sessions):', sessions)

    /* Set session. */
    const session = sessions[_sessionid]
    // console.log('GET ACCOUNT BY SESSION (session):', session)

    /* Loop through ALL (deposit) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.deposit; i++) {
        loadPath(getters, account, _sessionid, 0, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.change; i++) {
        loadPath(getters, account, _sessionid, 1, i)
    }

    /* Loop through ALL (Nito Cash) indexes (inclusive). */
    for (let i = 0; i <= getters.getNitoCashIdx; i++) {
        loadPath(getters, account, 0, 7867, i)
    }

    /* Loop through ALL (Nito Xchg) indexes (inclusive). */
    for (let i = 0; i <= session.accounts.xchg; i++) {
        loadPath(getters, account, _sessionid, 7888, i)
    }
    // console.log('GET ACCOUNT BY SESSION (account):', account)

    /* Return accounts. */
    return account
}

/* Export module. */
export default getAccountBySessionid
