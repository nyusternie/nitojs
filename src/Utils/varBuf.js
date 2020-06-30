const Utils = require('.')

/**
 * Variable Buffer
 */
const varBuf = (_buffer) => {
    const prependLength = Utils.varInt(_buffer.length)
    const result = Buffer.concat([prependLength, _buffer])

    /* Return the variable buffer encoded data. */
    return result
}

/* Export module. */
module.exports = varBuf
