/* Import modules. */
const debug = require('debug')('nitojs:message')
const EventEmitter = require('events').EventEmitter

/**
 * Message Class
 *
 * Handling of messages.
 */
class Message extends EventEmitter {
    constructor() {
        super()

        debug('Message class has been initialized.')
    }

    /* Sign Message */
    static sign(_wif, _message) {
        return require('./sign')(_wif, _message)
    }

    /* Verify Message */
    static verify(_address, _signature, _message) {
        return require('./verify')(_address, _signature, _message)
    }

}

/* Export module. */
module.exports = Message
