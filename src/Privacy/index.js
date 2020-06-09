/* Import modules. */
const debug = require('debug')('nitojs:privacy')
const EventEmitter = require('events').EventEmitter

/**
 * Privacy Class
 *
 * Provides support for privacy protocols. Currently supporting:
 *     1. CashFusion
 *     2. CashShuffle
*/
class Privacy extends EventEmitter {
    constructor() {
        super()

        debug('Privacy class has been initialized.')
    }

    /* Get Pools */
    // static get getPools() {
    //     return require('./getPools')()
    // }

    /* Get Tiers */
    // static get getTiers() {
    //     return require('./getTiers')()
    // }

    /* Shuffle Manager */
    shuffleManager(_coin, _changeFunc, _targetFunc, _disableAutoShuffle = false) {
        /* Import shuffle manager. */
        const ShuffleManager = require('./ShuffleManager')

        /* Initialize shuffle manager. */
        const shuffleManager = new ShuffleManager(_coin, _changeFunc, _targetFunc, _disableAutoShuffle)
        console.log('SHUFFLE MANAGER', shuffleManager)

        /* Return shuffle manager. */
        return shuffleManager
    }

}

/* Export module. */
module.exports = Privacy
