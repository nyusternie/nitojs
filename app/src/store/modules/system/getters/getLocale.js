/**
 * Get Locale
 */
const getLocale = (state) => {
    /* Validate state. */
    if (!state || !state.locale) {
        return null
    }

    /* Initialize locale. */
    let locale = null

    /* Initialize accounts. */
    try {
        locale = state.locale
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
    }

    /* Return locale. */
    return locale
}

/* Export module. */
export default getLocale
