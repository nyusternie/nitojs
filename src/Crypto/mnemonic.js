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

    /* Generate mnemonic. */
    const mnemonic = Mnemonic(_entropy, language)

    /* Return mnemonic word phrase. */
    return mnemonic
}

/* Export module. */
module.exports = mnemonic
