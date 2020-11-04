/* Import modules. */
const debug = require('debug')('nitojs:crypto:mnemonic')
const Mnemonic = require('bitcore-mnemonic')

/**
 * Mnemonic
 */
const mnemonic = (_entropy, _language) => {
    debug('Generating mnemonic phrase with:', _entropy)

    // FIXME: We need to validate the _entropy (string or buffer)

    /* Validate entropy. */
    const entropy = Buffer.from(_entropy)

    /* Initialize language. */
    let language = null

    /* Validate language. */
    if (_language) {
        /* Handle language selection. */
        switch(_language.toUpperCase()) {
        case 'english':
            language = Mnemonic.Words.ENGLISH
            break
        }
    } else {
        language = Mnemonic.Words.ENGLISH
    }

    /* Initialize mnemonic. */
    let mnemonic = null

    /* Generate mnemonic. */
    try {
        mnemonic = Mnemonic(entropy, language)
    } catch (err) {
        // FIXME: Add better error handling.
        mnemonic = Mnemonic(_entropy, language)
    }

    /* Return mnemonic word phrase. */
    return mnemonic
}

/* Export module. */
module.exports = mnemonic
