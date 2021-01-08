/* Import modules. */
const debug = require('debug')('nitojs:blockchain:swap')
const EventEmitter = require('events').EventEmitter

/**
 * Sipnet Class
 *
 * A gossip-style protocol for anonymous, uncensorable communications over
 * trustless peer-to-peer networks.
 *
 * source: https://sipnet.io
 *
 * NOTE: The following are key development references:
 *   1. https://swarm.ethereum.org/
 *   2. https://orbitdb.org/
 *   3. https://our.status.im/whisper-pss-comparison/
 *   3. https://gun.eco/
 *   4. https://github.com/vinarmani/swap-protocol/blob/master/swap-protocol-spec.md
 */
class Sipnet extends EventEmitter {
    constructor() {
        super()

        debug('Sipnet has been initialized.')
    }

}

/* Export module. */
module.exports = Sipnet
