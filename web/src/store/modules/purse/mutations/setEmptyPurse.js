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
    delete state.purse

    /* Reset master seed. */
    state.masterSeed = null
}

/* Export module. */
export default destroyPurse
