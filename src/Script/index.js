/* Import modules. */
const debug = require('debug')('nitojs:script')
const EventEmitter = require('events').EventEmitter

/**
 * Script Class
 *
 * Script functions.
 */
class Script extends EventEmitter {
    constructor(_buffer) {
        super()

        /* Initialize buffer. */
        this.buffer = _buffer

        debug('Script class has been initialized.')
    }

    /* To Hex */
    toHex() {
        return require('./toHex').bind(this)()
    }

}

/* Export module. */
module.exports = Script
