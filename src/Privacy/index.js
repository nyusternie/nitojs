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

    /* Get Shuffle Manager */
    get getShuffleManager() {
        return require('./getShuffleManager')
    }

}

/* Export module. */
module.exports = Privacy
