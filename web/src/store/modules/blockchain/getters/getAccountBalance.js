/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
* Get Account Balance
*
* NOTE: This function will accept ANY account address to retrieve the
*       current balance (in satoshis).
*/
const getAccountBalance = (state, getters, rootState) => async (_account) => {
    console.log('GET ACCOUNT BALANCE', _account)

    try {
        /* Retrieve account details. */
        const details = await bitbox.Address.details(_account)
        console.log('ACCOUNT DETAILS', JSON.stringify(details, null, 4))

        /* Initialize balance. */
        let balance = 0

        /* Set balance (in satoshis). */
        if (rootState.profile.useUnconfirmed) {
            /* Both confirmed and unconfirmed. */
            balance = (details.balanceSat + details.unconfirmedBalanceSat)
        } else {
            /* Confirmed ONLY. */
            balance = details.balanceSat
        }

        /* Return (satoshi) balance. */
        return balance
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default getAccountBalance
