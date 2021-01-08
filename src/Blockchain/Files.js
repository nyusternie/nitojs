/* Import modules. */
const debug = require('debug')('nitojs:blockchain:swap')
const EventEmitter = require('events').EventEmitter

/**
 * Files Class
 *
 * A simple protocol for adding files to the Bitcoin Cash blockchain, based on
 * the Bitcoin Files Protocol (BFP).
 *
 * source: https://github.com/simpleledger/slp-specifications/blob/master/bitcoinfiles.md
 *         https://github.com/BitcoinFiles/bitcoinfiles-sdk
 */
class Files extends EventEmitter {
    constructor() {
        super()

        debug('Files has been initialized.')
    }

}

/* Export module. */
module.exports = Files
