/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    /* Legacy wallet format compatiblity. */
    if (state.masterSeed.length === 64) { // DEPRECATED on 2020.6.10
        return Buffer.from(state.masterSeed, 'hex')
    } else {
        try {
            return msgpack.decode(Buffer.from(state.masterSeed))
        } catch (_err) {
            console.error(_err ) // eslint-disable-line no-console
            return Buffer.from(state.masterSeed) // DEPRECATED on 2020.6.25
        }
    }
}

/* Export module. */
export default getMasterSeed
