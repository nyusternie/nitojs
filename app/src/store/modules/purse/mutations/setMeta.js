/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Metadata
 */
const setMeta = (state, _meta) => {
    /* Set meta. */
    state.meta = msgpack.encode(_meta)
}

/* Export module. */
export default setMeta
