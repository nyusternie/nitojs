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

    try {
        // NOTE: This pure 32-bit hex remains unpacked.
        return Buffer.from(state.masterSeed, 'hex')
    } catch (err) {
        if (err) {
            console.error(err) // eslint-disable-line no-console
        }

        try {
            return msgpack.decode(Buffer.from(state.masterSeed)) // DEPRECATED on 2020.6.25
        } catch (err) {
            if (err) {
                console.error(err) // eslint-disable-line no-console
            }

            return msgpack.decode(Buffer.from(state.masterSeed, 'hex')) // DEPRECATED on 2020.7.6
        }
    }
}

/* Export module. */
export default getMasterSeed
