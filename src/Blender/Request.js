const debug = require('debug')('nitojs:blender:request')
const EventEmitter = require('events').EventEmitter

/**
 * Blender Request
 */
class Request extends EventEmitter {
    constructor () {
        super()

        debug(`Request class has been initialized.`)
    }
}

/* Export module. */
module.exports = Request
