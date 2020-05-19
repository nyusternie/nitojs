/**
 * Create Session
 */
const createSession = ({ commit, getters }) => {
    console.info('Creating a NEW session...') // eslint-disable-line no-console

    /* Initialize session model. */
    let sessionsModel = null

    try {
        /* Initialize sessions. */
        const sessions = getters.getSessions

        /* Validate sessions. */
        if (sessions) {
            /* Set current (active index). */
            const currentIndex = Math.max(...Object.keys(sessionCoins))

            /* Set next coin index. */
            const nextIndex = currentIndex + 1

            /* Add new session to model. */
            sessionModel[nextIndex] = {
                status: 'active',
                coins: {},
            }
        } else {
            /**
             * (Purse) Coins Model
             *
             * (s) Status code
             * (u) Unspent transaction outputs (UTXOs)
             *
             * Status codes:
             *     (a) Active: Session address is ready to receive OR spend funds.
             *     (d) Disabled: Already received and spent funds (MUST be empty).
             *     (l) Locked: Session address is reserved OR has received funds
             *                 currently being held in reserve for a later use.
             *                 (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
             *
             * NOTE: Unspent transaction outputs (UTXOs) are objects containing the
             *       status (code) of ALL inputs held by the session.
             */
            sessionsModel = {
                0: {
                    status: 'active',
                    coins: {},
                }
            }
        }

        /* Initialize sessions. */
        commit('setSessions', sessionsModel)
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default createSession
