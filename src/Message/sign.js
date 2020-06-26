/* Import modules. */
const Message = require('bitcore-message')
const bch = require('bitcore-lib-cash')

/**
 * Sign Message
 */
const sign = (_wif, _message) => {
    /* Set private key. */
    const privateKey = new bch.PrivateKey(_wif)

    /* Set message. */
    const message = new Message(_message)

    /* Generate signature. */
    const signature = message.sign(privateKey)

    /* Return signature. */
    return signature
}

/* Export module. */
module.exports = sign
