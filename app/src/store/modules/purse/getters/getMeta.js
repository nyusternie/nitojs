/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Metadata
 */
const getMeta = (state) => {
    /* Validate state (of metadata). */
    if (!state || !state.meta) {
        return null
    }

    /* Initialize metadata. */
    const meta = msgpack.decode(Buffer.from(state.meta))

    /* Return metadata. */
    return meta
}

/* Export module. */
export default getMeta
