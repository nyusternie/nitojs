/**
 * Get (Wallet) History
 *
 * Retrieves ALL accounts held within this wallet, then
 * updates the full history.
 */
const getHistory = async (state, getters) => {
    console.info('Retrieving account history...') // eslint-disable-line no-console

    /* Initialize history. */
    const history = [
        state,
        getters,
    ]

    /* Return history. */
    return history
}

/* Export module. */
export default getHistory
