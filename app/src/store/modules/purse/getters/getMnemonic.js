/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get Mnemonic
 *
 * source: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
 */
const getMnemonic = (state, getters) => {
    /* Set master seed. */
    const masterSeed = getters.getMasterSeed

    /* Set locale. */
    const locale = getters.getLocale

    /**
     * Create mnemonic wordlist using BIP-39.
     * (https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
     *
     * Available languages are:
     *   01. English
     *   02. Japanese
     *   03. Korean
     *   04. Spanish
     *   05. Chinese (Simplified)
     *   06. Chinese (Traditional)
     *   07. French
     *   08. Italian
     *   09. Czech
     */
    let language = null

    /* Handle language selection. */
    switch(locale) {
    case 'en-US':
        language = bitbox.Mnemonic.wordLists()['english']
        break
    default:
        language = bitbox.Mnemonic.wordLists()['english']
    }

    /* Initialize mnemonic. */
    const mnemonic = bitbox.Mnemonic.fromEntropy(masterSeed, language)
    // console.log('MNEMONIC', mnemonic)

    /* Return mnemonic. */
    return mnemonic
}

/* Export module. */
export default getMnemonic
