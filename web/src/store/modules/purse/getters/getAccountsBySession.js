/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
 * Get ALL Session Accounts
 *
 * Returns (account and index) for ALL (in-use) session accounts.
 */
const getAccounts = (state, getters) => (_sessionId) => {
    /* Validate sessions. */
    if (!getters.getSessions) {
        return null
    }

    /* Initialize sessions. */
    const sessions = getters.getSessions
    // console.log('GET ACCOUNTS (sessions):', sessions)

    /* Initialize accounts. */
    const accounts = []

    /* Add all active receiving account (accounts) to pool. */
    Object.keys(sessions).forEach(index => {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        /* Set derivation path. */
        const path = getters.getDerivationPath(_sessionId, index)
        // console.log('GET ACCOUNTS (path)', path)

        /* Initialize child node. */
        const childNode = hdNode.derivePath(path)

        /* Set WIF. */
        const wif = bitbox.HDNode.toWIF(childNode)

        /* Set account (address). */
        const address = bitbox.HDNode.toCashAddress(childNode)
        // console.log('GET ACCOUNTS (address)', address)

        /* Add to all receiving (pool). */
        accounts.push({
            address,
            index,
            wif,
        })
    })

    /* Return accounts. */
    return accounts
}

/* Export module. */
export default getAccounts
