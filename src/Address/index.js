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
    constructor(_mappedKeys, _reqNumSigs) {
        super()

        this.mappedKeys = _mappedKeys
        this.reqNumSigs = _reqNumSigs

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
    // TODO: Add tests plus more methods (https://www.npmjs.com/package/bchaddrjs)
    static isCashAddress(_address) {
        return require('./isCashAddress')(_address)
    }

    /* Is Legacy Address */
    // TODO: Add tests plus more methods (https://www.npmjs.com/package/bchaddrjs)
    static isLegacyAddress(_address) {
        return require('./isLegacyAddress')(_address)
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

    /* To Public Key (Script) Hash */
    static toPubKeyHash(_address) {
        return require('./toPubKeyHash')(_address)
    }

    /* To String */
    toString() {
        return require('./toString').bind(this)()
    }

    /* Unspent Transaction Outputs */
    static utxos(_address, _compatibility) {
        return require('./utxos')(_address, _compatibility)
    }

}

/* Initialize aliases. */
Address.utxo = Address.utxos

/* Export module. */
module.exports = Address
