/* Import modules. */
const bch = require('bitcore-lib-cash')
const crypto = require('crypto')
const debug = require('debug')('nitojs:crypto:hash')

/**
 * Hashing
 */
const hash = (_message, _algo = 'sha512') => {
    debug(`Generating [ ${_algo} ] hash.`)

    /* Initialize hash hex. */
    let hashHex = null

    /* Handle blockchain special-cases. */
    if (_algo === 'sha256sha256') {
        /* Set message buffer. */
        const buf = Buffer.from(_message)

        /* Calculate digest. */
        const digest = bch.crypto.Hash.sha256sha256(buf)

        /* Conver to hex format. */
        hashHex = digest.toString('hex')
    } else if (_algo === 'sha256ripemd160') {
        /* Set message buffer. */
        const buf = Buffer.from(_message)

        /* Calculate digest. */
        const digest = bch.crypto.Hash.sha256ripemd160(buf)

        /* Conver to hex format. */
        hashHex = digest.toString('hex')
    } else {
        /* Initialize hashing algorithm. */
        const hash = crypto.createHash(_algo)

        /* Set data. */
        const data = hash.update(_message, 'utf-8')

        /* Convert to hex format. */
        hashHex = data.digest('hex')
    }

    /* Return hash. */
    return hashHex
}

/* Export module. */
module.exports = hash
