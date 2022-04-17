/**
 * Get Metadata
 */
const getMeta = (state) => {
    /* Validate state. */
    if (!state || !state.meta) {
        return null
    }

    /* Initialize metadata. */
    const meta = state.meta

    /* Return metadata. */
    return meta
}

/* Export module. */
export default getMeta
