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

    /* Decode Number */
    static decodeNumber(_bufferValue) {
        return require('./decodeNumber')(_bufferValue)
    }

    /* Dust Limit */
    static get dustLimit() {
        return 546
    }

    /* Encode Number */
    static encodeNumber(_satoshis) {
        return require('./encodeNumber')(_satoshis)
    }

    /* Maximum (Satoshi) Limit */
    static get maxLimit() {
        return 2099999997690000
    }

    /* Reverse Buffer */
    static reverseBuffer(_buffer) {
        return require('./reverseBuffer')(_buffer)
    }

    /* Sleep */
    static sleep(_ms) {
        return require('./sleep')(_ms)
    }

    /* Variable Buffer */
    static varBuf(_buffer) {
        return require('./varBuf')(_buffer)
    }

    /* Variable Integer */
    static varInt(_number) {
        return require('./varInt')(_number)
    }

}

/* Export module. */
module.exports = Utils
