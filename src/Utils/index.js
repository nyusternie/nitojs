/* Import modules. */
const debug = require('debug')('nitojs:utils')
const EventEmitter = require('events').EventEmitter

/**
 * Utilities Class
 *
 * Useful functions.
 */
class Utils extends EventEmitter {
    constructor() {
        super()

        debug('Utilities class has been initialized.')
    }

    /* Reverse Buffer */
    static reverseBuffer(_buffer) {
        return require('./reverseBuffer')(_buffer)
    }

}

/* Export module. */
module.exports = Utils
