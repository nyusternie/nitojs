/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Pool
 */
const setPool = (state, _pool) => {
    /* Set pool. */
    state.pool = msgpack.encode(_pool).toString('hex')
}

/* Export module. */
export default setPool
