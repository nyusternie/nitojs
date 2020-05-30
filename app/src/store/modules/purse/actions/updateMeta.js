/**
 * Update Metadata
 */
const updateMeta = ({ commit }, _meta) => {
    /* Commit empty purse. */
    commit('setMeta', _meta)
}

/* Export module. */
export default updateMeta
