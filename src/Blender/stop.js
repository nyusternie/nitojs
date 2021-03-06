/* Import modules. */
// const debug = require('debug')('nitojs:blender:stop')

/**
 * Stop
 */
const stop = () => {
    /* Validate shuffling status. */
    if (this.isShuffling) {
        /* Set shuffling flag. */
        this.isShuffling = false

        console.log('DEBUGGING ROUNDS:', this.rounds)

        /* Stop round. */
        this.rounds[0].stop()
    }
}

/* Export module. */
module.exports = stop
