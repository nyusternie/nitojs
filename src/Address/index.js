/* Import modules. */
const debug = require('debug')('nitojs:address')
const EventEmitter = require('events').EventEmitter

/**
 * Address Class
 *
 * Perform address-related functions.
 *
 * NOTE: This class is read-only and ONLY supports static methods.
 */
class Address extends EventEmitter {
    constructor() {
        super()

        debug('Address class has been initialized.')
    }

    /* To Cash Address */
    static toCashAddress(_address) {
        return require('./toCashAddress')(_address)
    }

    /* To Legacy Address */
    static toLegacyAddress(_address) {
        return require('./toLegacyAddress')(_address)
    }

    /* To Public Key (Script) Hash */
    static toPubKeyHash(_address) {
        return require('./toPubKeyHash')(_address)
    }

    /* Unspent Transaction Outputs */
    static utxo(_address, _compatibility) {
        return require('./utxo')(_address, _compatibility)
    }

}

/* Export module. */
module.exports = Address
