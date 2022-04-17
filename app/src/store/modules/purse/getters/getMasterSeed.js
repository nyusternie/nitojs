/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    try {
        return Buffer.from(state.masterSeed, 'hex')
    } catch (err) {
        if (err) {
            console.error(err) // eslint-disable-line no-console
        }
    }
}

/* Export module. */
export default getMasterSeed
