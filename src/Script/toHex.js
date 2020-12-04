/* Import modules. */
const bch = require('bitcore-lib-cash')
const debug = require('debug')('nitojs:script:tohex')

/**
 * To Hex
 *
 * ...
 */
const toHex = function () {
    debug(`Displaying [ ${this.buffer} ] as hex.`)

    /* Initialize new script. */
    // FIXME: Why does this have to be "new"??
    const script = new bch.Script(this.buffer)

    /* Return hex script. */
    return script.toHex()
}

/* Export module. */
module.exports = toHex
