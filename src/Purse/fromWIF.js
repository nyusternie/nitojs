/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:purse:fromwif')

/**
 * From WIF
 */
const fromWIF = (_wif) => {
    debug(`Initialize coin from [ ${_wif} ]`)

    /* Initialize coin. */
    const coin = bch.PrivateKey.fromWIF(_wif)

    /* Return coin. */
    return coin
}

/* Export module. */
module.exports = fromWIF
