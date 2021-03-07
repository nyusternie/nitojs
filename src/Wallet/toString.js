/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:address:tostring')

/**
 * To String
 *
 * ...
 */
const toString = function () {
    debug(`Displaying [ ${this._mappedKeys} ] [ ${this._numSigs} ] as string.`)

    /* Initialize new address. */
    // FIXME: Why does this have to be "new"??
    const address = new bch.Address(this._mappedKeys, this._numSigs)

    /* Return address string. */
    return address.toString()
}

/* Export module. */
module.exports = toString
