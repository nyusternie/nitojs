/**
 * Add Session
 *
 * Adds a new session to the current purse.
 */
const addSession = ({ commit, getters }) => {
    console.info('Creating a NEW session...') // eslint-disable-line no-console

    /**
     * Accounts (Index) Model
     *
     * Manages the indexes of account (addresses) and their respective
     * derivation paths.
     *
     * Deposit   : m/44'/145'/<session>'/0/<index>
     * Change    : m/44'/145'/<session>'/1/<index>
     * Nito Cash : m/44'/145'/0'/7867/<index>
     * Nito Xchg : m/44'/145'/<session>'/7888/<index>
     *
     * NOTE: Change is considered "toxic waste", and will have to be
     *       discarded or re-combined (using CashFusion) once it falls
     *       below the lowest threshold for CashShuffle (ie. 10,270 satoshis).
     *
     * NOTE: Nito Cash will be a single `session` and `chain` to allow
     *       for better support with Nito-based wallets.
     */
    const accountsModel = {
        deposit: 0,
        change: 0,
        nitoxchg: 0, // NOTE: For "possible" future compatibility with Nito Exchange.
    }

    /**
     * Session Model
     *
     * Status codes:
     *     active: Session address is ready to receive OR spend funds.
     *     disabled: Already received and spent funds (MUST be empty).
     *     locked: Session address is reserved OR has received funds currently
     *             being held in reserve for a later use.
     *             (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
     *
     * Coins are (UTXO) objects containing:
     *     - txid
     *     - vout
     *     - satoshis
     *     - wif (Wallet Import Format)
     *     - cashAddress
     *     - legacyAddress
     */
    const sessionModel = {
        status: 'active',
        accounts: accountsModel,
        coins: {},
    }

    try {
        /* Initialize sessions. */
        let sessions = getters.getSessions

        /* Validate sessions. */
        if (sessions) {
            /* Set current (active index). */
            const currentIndex = Math.max(...Object.keys(sessions))

            /* Set next coin index. */
            const nextIndex = currentIndex + 1

            /* Add new session to model. */
            sessions[nextIndex] = sessionModel

            /* Commit active session id. */
            commit('setActiveSessionId', nextIndex)
        } else {
            /* Initialize (first) session(s). */
            sessions = {
                0: sessionModel,
            }

            /* Commit active session id. */
            commit('setActiveSessionId', 0)
        }

        /* Commit sessions. */
        commit('setSessions', sessions)
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default addSession
