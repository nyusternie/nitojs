/* Import modules. */
const debug = require('debug')('nitojs:markets')
const EventEmitter = require('events').EventEmitter

/**
 * Markets Class
 *
 * Real-time market data, pulled from 3rd-party APIs.
 *
 * NOTE: This class is read-only and ONLY supports static methods.
 */
class Markets extends EventEmitter {
    constructor() {
        super()

        debug('Markets class has been initialized.')
    }

    /* Get Quote */
    static getQuote(_baseCurrency, _quoteCurrency) {
        return require('./getQuote')(_baseCurrency, _quoteCurrency)
    }

    /* Get Ticker */
    static getTicker(_baseCurrency, _quoteCurrency) {
        return require('./getTicker')(_baseCurrency, _quoteCurrency)
    }

}

/* Export module. */
module.exports = Markets
