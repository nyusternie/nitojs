/* Import modules. */
const debug = require('debug')('nitojs:app')
const EventEmitter = require('events').EventEmitter

/**
 * Application Class
 *
 * Provides an interface to browser-based decentralized APIs.
*/
class Application extends EventEmitter {
    constructor() {
        super()

        debug('Application class has been initialized.')
    }

    /* Get Address */
    static get getAddress() {
        // return require('./getAddress')()
        return '1NitoJSTestCashAddress'
    }

    /* Send Assets */
    static get sendAssets() {
        // return require('./sendAssets')()
        return 'assets sent!'
    }

    /* Virtual Purse Manager */
    purse(_params) {
        console.log('PARAMS', _params)

        /* Return parameters. */
        return _params
    }

    /* Virtual Wallet Manager */
    wallet(_params) {
        console.log('PARAMS', _params)

        /* Return parameters. */
        return _params
    }

}

/* Export module. */
module.exports = Application
