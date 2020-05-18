/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Coins
 */
const setCoins = (state, _coins) => {
    /* Set coins. */
    state.coins = msgpack.encode(_coins)
}

/* Export module. */
export default setCoins
