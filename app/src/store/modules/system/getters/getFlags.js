/**
 * Get Flags
 */
const getFlags = (state) => {
    /* Validate state. */
    if (!state || !state.flags) {
        return null
    }

    /* Initialize flags. */
    let flags = null

    /* Initialize accounts. */
    try {
        flags = state.flags
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
    }

    /* Return flags. */
    return flags
}

/* Export module. */
export default getFlags
