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
    static sign(_message, _wif) {
        return require('./sign')(_message, _wif)
    }

    /* Verify Message */
    static verify(_message, _address, _signature) {
        return require('./verify')(_message, _address, _signature)
    }

}

/* Export module. */
module.exports = Message
