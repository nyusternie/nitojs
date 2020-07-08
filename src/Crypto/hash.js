/* Import modules. */
const bch = require('bitcore-lib-cash')
const crypto = require('crypto')
const debug = require('debug')('nitojs:crypto:hash')

/**
 * Hashing
 */
const hash = (_message, _algo = 'sha512') => {
    debug(`Generating [ ${_algo} ] hash.`)

    /* Initialize digest. */
    let digest = null

    /* Handle blockchain special-cases. */
    if (_algo === 'sha256sha256') {
        /* Set message buffer. */
        const buf = Buffer.from(_message)

        /* Calculate digest. */
        digest = bch.crypto.Hash.sha256sha256(buf)
    } else if (_algo === 'sha256ripemd160') {
        /* Set message buffer. */
        const buf = Buffer.from(_message)

        /* Calculate digest. */
        digest = bch.crypto.Hash.sha256ripemd160(buf)
    } else {
        /* Initialize hashing algorithm. */
        const hash = crypto.createHash(_algo)

        /* Set data. */
        const data = hash.update(_message, 'utf-8')

        /* Convert to hex format. */
        digest = data.digest()
    }

    /* Return digest. */
    return digest
}

/* Export module. */
module.exports = hash
