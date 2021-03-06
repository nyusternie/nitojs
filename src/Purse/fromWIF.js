/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:purse:fromwif')

/**
 * Address (Node)
 *
 * Initialize an address from its Wallet Import Format (WIF).
 */
const fromWIF = (_wif) => {
    debug(`Initialize node from [ ${_wif} ]`)

    /* Initialize node. */
    const node = bch.PrivateKey.fromWIF(_wif)

    /* Return node. */
    return node
}

/* Export module. */
module.exports = fromWIF
