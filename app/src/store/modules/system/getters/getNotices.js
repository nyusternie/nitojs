/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Notices
 */
const getNotices = (state) => {
    /* Validate state. */
    if (!state || !state.notices) {
        return null
    }

    /* Initialize notices. */
    let notices = null

    /* Initialize accounts. */
    try {
        notices = msgpack.decode(Buffer.from(state.notices, 'hex'))
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        notices = state.notices // DEPRECATED in June '20
    }

    /* Return notices. */
    return notices
}

/* Export module. */
export default getNotices
