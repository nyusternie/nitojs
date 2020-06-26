/* Import modules. */
const crypto = require('crypto')
const debug = require('debug')('nitojs:crypto:hash')

/**
 * Hashing
 */
const hash = (_message, _algo = 'sha512') => {
    debug(`Generating [ ${_algo} ] hash.`)

    /* Initialize hashing algorithm. */
    const hash = crypto.createHash(_algo)

    /* Set data. */
    const data = hash.update(_message, 'utf-8')

    /* Conver to HEX format. */
    const hashHex = data.digest('hex')

    /* Return hash. */
    return hashHex
}

/* Export module. */
module.exports = hash
