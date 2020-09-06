/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:address:fromxpub')

/**
 * From an Extended Public Key
 *
 * Examples include:
 *   - `m/0/0` (traditionally the 1st path in a wallet)
 *   - `m/0/1` (traditionally the 2nd path)
 *   - `m/1/1` (traditionally the 2nd path of the 2nd account)
 */
const fromXPub = (_xpub, _path) => {
    debug('Deriving extended public key:', _xpub, _path)

    /* Validate extended public key. */
    if (!_xpub) {
        throw new Error('You MUST provide an extended public key.')
    }

    /* Validate path. */
    if (!_path) {
        throw new Error('You MUST provide a path (eg. `m/0/0`).')
    }

    /* Initialize parent. */
    const parent = new bch.HDPublicKey(_xpub)

    /* Derive child. */
    const child = parent.deriveChild(_path)

    /* Generate address. */
    const address = bch.Address(child.publicKey).toString()

    /* Return address. */
    return address
}

/* Export module. */
module.exports = fromXPub
