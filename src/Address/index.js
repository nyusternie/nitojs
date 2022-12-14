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
    constructor(_publicKey) {
        super()

        /* Set public key. */
        this.publicKey = _publicKey

        debug('Address class has been initialized.')
    }

    /* Balance */
    // NOTE: Returns a promise.
    static balance(_address) {
        return require('./balance')(_address)
    }

    /* Details */
    // NOTE: Returns a promise.
    static details(_address) {
        return require('./details')(_address)
    }

    /* Is Cash Address */
    static isCashAddress(_address) {
        return require('./isCashAddress')(_address)
    }

    /* Is Legacy Address */
    static isLegacyAddress(_address) {
        return require('./isLegacyAddress')(_address)
    }

    /* Is SLP Address */
    static isSlpAddress(_address) {
        return require('./isSlpAddress')(_address)
    }

    /* From Extended Public Key */
    static fromXPub(_xpub, _path) {
        return require('./fromXPub')(_xpub, _path)
    }

    /* To Cash Address */
    static toCashAddress(_address) {
        return require('./toCashAddress')(_address)
    }

    /* To Legacy Address */
    static toLegacyAddress(_address) {
        return require('./toLegacyAddress')(_address)
    }

    /* To SLP Address */
    static toSlpAddress(_address) {
        return require('./toSlpAddress')(_address)
    }

    /* To String */
    toString() {
        return require('./toString').bind(this)()
    }

    /* To Public Key (Script) Hash */
    static toPubKeyHash(_address) {
        return require('./toPubKeyHash')(_address)
    }

    /* Unspent Transaction Outputs */
    static utxos(_address, _compatibility) {
        return require('./utxos')(_address, _compatibility)
    }

}

/* Initialize (static) aliases. */
Address.utxo = Address.utxos

/* Export module. */
module.exports = Address
