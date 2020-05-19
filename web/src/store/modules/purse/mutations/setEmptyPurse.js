/**
 * Destroy Purse
 *
 * This will completely destory the user's purse,
 * as well as ALL imported seeds.
 */
const destroyPurse = (state) => {
    /* Reset coins. */
    state.coins = null

    // FOR DEVELOPMENT PURPOSES ONLY
    // delete state.purses

    /* Reset master seed. */
    state.masterSeed = null

    /* Reset sessions. */
    state.sessions = null
}

/* Export module. */
export default destroyPurse
