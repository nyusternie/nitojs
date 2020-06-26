/* Import modules. */
const Message = require('bitcore-message')

/**
 * Verify Message
 */
const verify = (_address, _signature, _message) => {
    /* Handle verification. */
    const verified = Message(_message).verify(_address, _signature);

    /* Return verification. */
    return verified
}

/* Export module. */
module.exports = verify
