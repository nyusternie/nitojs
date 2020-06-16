/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:crypto:randombytes')

/**
 * Random Bytes
 */
const randomBytes = (_size) => {
    debug(`Generating [ ${_size} ] random bytes.`)

    // if (typeof(window) !== 'undefined') {
    //     /* Return random bytes. */
    //     return bch.crypto.Random.getRandomBufferBrowser(_size)
    // } else {
    //     /* Return random bytes. */
    //     return bch.crypto.Random.getRandomBufferNode(_size)
    // }

    /* Return random bytes. */
    return bch.crypto.Random.getRandomBuffer(_size)
}

/* Export module. */
module.exports = randomBytes
