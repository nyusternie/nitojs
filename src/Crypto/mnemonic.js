/* Import modules. */
const debug = require('debug')('nitojs:crypto:mnemonic')
const Mnemonic = require('bitcore-mnemonic')

/**
 * Mnemonic
 */
const mnemonic = (_entropy, _language) => {
    debug('Generating mnemonic phrase with:', _entropy)

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
        mnemonic = Mnemonic(_entropy, language)
    } catch (err) {
        console.error('ERROR: Generating Mnemonic', err)

        // FIXME: We need to validate the _entropy (string or buffer)

        /* Validate entropy. */
        const entropy = Buffer.from(_entropy)

        mnemonic = Mnemonic(entropy, language)
    }

    /* Return mnemonic word phrase. */
    return mnemonic
}

/* Export module. */
module.exports = mnemonic
