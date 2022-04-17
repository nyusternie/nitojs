/**
 * Get Pool
 */
const getPool = (state) => {
    /* Validate state. */
    if (!state || !state.pool) {
        return null
    }

    /* Initialize pool. */
    let pool = null

    /* Initialize accounts. */
    try {
        pool = state.pool
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
    }

    /* Return pool. */
    return pool
}

/* Export module. */
export default getPool
