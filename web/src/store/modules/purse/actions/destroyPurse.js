/**
 * Destroy Purse
 */
const destroyPurse = ({ commit }) => {
    console.info('Destroying purse...')

    /* Commit empty purse. */
    commit('setEmptyPurse')
}

/* Export module. */
export default destroyPurse
