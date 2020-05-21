/**
 * Destroy Purse
 *
 * This will completely destory the user's purse,
 * as well as ALL imported seeds.
 */
const destroyPurse = (state) => {
    /* Reset master seed. */
    state.masterSeed = null

    /* Reset sessions. */
    state.sessions = null
}

/* Export module. */
export default destroyPurse
