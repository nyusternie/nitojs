/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Notices
 */
const setNotices = (state, _notices) => {
    /* Set notices. */
    state.notices = msgpack.encode(_notices).toString('hex')
}

/* Export module. */
export default setNotices
