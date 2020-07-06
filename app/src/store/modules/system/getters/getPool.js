/* Import modules. */
const msgpack = require('msgpack-lite')

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
        pool = msgpack.decode(Buffer.from(state.pool, 'hex'))
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        pool = state.pool // DEPRECATED in June '20
    }

    /* Return pool. */
    return pool
}

/* Export module. */
export default getPool
