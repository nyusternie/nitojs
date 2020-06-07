/**
 * Add Session
 *
 * Adds a new session to the current purse.
 */
const addSession = ({ commit, getters }) => {
    console.info('Creating a NEW session...') // eslint-disable-line no-console

    /**
     * Account Model
     *
     * Manages the indexes of accounts (addresses) and their respective
     * derivation paths.
     *
     * Deposit   : m/44'/145'/<session>'/0/<index>
     * Change    : m/44'/145'/<session>'/1/<index>
     * Nito Cash : m/44'/145'/0'/7867/<index>
     * Nito Xchg : m/44'/145'/<session>'/7888/<index>
     *
     * NOTE: Change is considered "toxic waste", and will have to be
     *       discarded or re-combined (using CashFusion) once it falls
     *       below the lowest threshold for CashShuffle.
     *
     * NOTE: Nito Cash will be a single `session` and `chain` to allow
     *       for better support with Nito-based wallets.
     */
    const accountModel = {
        deposit: 0,
        change: 0,
        nitoxchg: 0, // FOR FUTURE COMPATIBILITY
    }

    /* Initialize session model. */
    let sessionModel = null

    try {
        /* Initialize sessions. */
        const sessions = getters.getSessions

        /* Validate sessions. */
        if (sessions) {
            /* Set current (active index). */
            const currentIndex = Math.max(...Object.keys(sessions))

            /* Set next coin index. */
            const nextIndex = currentIndex + 1

            /* Add new session to model. */
            sessionModel[nextIndex] = {
                status: 'active',
                account: accountModel,
                coins: {},
            }
        } else {
            /**
             * Session Model
             *
             * Status codes:
             *     (a) Active: Session address is ready to receive OR spend funds.
             *     (d) Disabled: Already received and spent funds (MUST be empty).
             *     (l) Locked: Session address is reserved OR has received funds
             *                 currently being held in reserve for a later use.
             *                 (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
             *
             * Coins are (UTXO) objects containing:
             *     - txid
             *     - vout
             *     - amountSatoshis
             *     - privateKeyWif
             *     - cashAddress
             *     - legacyAddress
             */
            sessionModel = {
                0: {
                    status: 'active',
                    account: accountModel,
                    coins: {}
                }
            }
        }

        /* Initialize sessions. */
        commit('setSessions', sessionModel)
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default addSession
