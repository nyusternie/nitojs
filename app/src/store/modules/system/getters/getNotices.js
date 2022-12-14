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
        notices = state.notices
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
    }

    /* Return notices. */
    return notices
}

/* Export module. */
export default getNotices
