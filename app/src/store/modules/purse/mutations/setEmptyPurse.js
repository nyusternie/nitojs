/**
 * Destroy Purse
 *
 * This will completely destory the user's purse,
 * as well as ALL imported seeds.
 */
const destroyPurse = (state) => {
    /* Reset active session. */
    state.activeSessionid = null

    /* Reset master seed. */
    state.masterSeed = null

    /* Reset metadata. */
    state.meta = null

    /* Reset Nito Cash index. */
    state.nitoCashIdx = null

    /* Reset outbox. */
    state.outbox = null

    /* Reset sessions. */
    state.sessions = null
}

/* Export module. */
export default destroyPurse
