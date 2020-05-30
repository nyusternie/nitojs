/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/* Set websocket endpoint. */
// const wsURL = 'https://ws.bitcoin.com'
const wsURL = 'wss://ws.bitcoin.com'

/**
 * Initialize WebSocket connection handler.
 *
 * NOTE: We DO NOT use the application "state"; so as to avoid
 *       persisting the connection data (and bloating the storage data).
 */
let socket = null

/**
* Get Connection
*/
const getSocket = () => (_callback, _action) => {
    console.log('BLOCKCHAIN SOCKET', socket)

    /* Set callback. */
    const callback = _callback

    if (_action === 'open') {
        /* Open socket connection. */
        socket = new bitbox.Socket({ callback, wsURL })
    }

    if (_action === 'close' && socket) {
        /* Close socket connection. */
        socket.close(callback)
    }

    /* Return socket connection. */
    return socket
}

/* Export module. */
export default getSocket
