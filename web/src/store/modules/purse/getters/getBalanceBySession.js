/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
* Get Balance by Session
*
* Retrieves the current (total) session balance.
*
* NOTE: Optional (market price) parameter is used to calculate fiat value,
*       and return a "formatted" value package.
*/
const getBalanceBySession = (
    state, getters, rootState, rootGetters
) => async (_sessionId, _currency) => {
    /* Validate (session) accounts. */
    if (!getters.getCoinsBySession(_sessionId)) {
        return null
    }

    /* Initialize search accounts. */
    const searchAccts = []

    const coins = getters.getCoinsBySession(_sessionId)
    console.log('GET BALANCE BY SESSION (coins)', coins)
    return 0

    /* Add all active receiving account (searchAccts) to pool. */
    Object.keys().forEach((txid, index) => {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        /* Set derivation path. */
        const path = getters.getDerivationPath(_sessionId, index)
        console.log('GET BALANCE BY SESSION (path)', path)

        /* Initialize child node. */
        const childNode = hdNode.derivePath(path)

        const address = bitbox.HDNode.toCashAddress(childNode)
        console.log('GET BALANCE BY SESSION (receiving address)', address)

        /* Add to all receiving (pool). */
        searchAccts.push(address)
    })
    console.log('GET BALANCE BY SESSION (all accounts)', searchAccts)

    /* Validate search accounts. */
    if (!searchAccts) {
        return 0
    }

    try {
        /* Initialize balance. */
        let balance = 0

        /* Retrieve (ALL) account(s) details. */
        const details = await bitbox.Address.details(addresses)
        // console.log('ALL ACCOUNTS DETAILS', JSON.stringify(details, null, 4))

        /* Validate (use of) unconfirmed transactions. */
        if (rootGetters['getFlags'] && rootGetters['getFlags'].unconfirmed) {
            details.forEach((address) => {
                /* Both confirmed and unconfirmed. */
                balance += (address.balanceSat + address.unconfirmedBalanceSat)
            })
        } else {
            details.forEach((address) => {
                /* Confirmed ONLY. */
                balance += address.balanceSat
            })
        }

        /* Retrieve market price. */
        const marketPrice =
            await rootGetters['blockchain/getTicker'](_currency)
        console.info(`Market price (${_currency})`, marketPrice) // eslint-disable-line no-console

        /* Validate market price. */
        if (marketPrice) {
            /* Format balance (for display). */
            // TODO: Support additional currencies.
            const formattedBalance =
                rootGetters['utils/getFormattedValue'](balance, marketPrice, 'USD')

            /* Return (formatted) balance. */
            return formattedBalance
        } else {
            /* Return (empty) balance. */
            return null
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default getBalanceBySession
