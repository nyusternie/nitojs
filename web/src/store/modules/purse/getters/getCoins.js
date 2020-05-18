/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Coins
 *
 * Returns addresses for ALL (in-use) receiving coins.
 */
const getCoins = (state) => {
    /* Validate state (of coins). */
    if (!state || !state.coins) {
        return null
    }

    /* Initialize coins. */
    const coins = msgpack.decode(Buffer.from(state.coins))

    /* Return coins. */
    return coins
}

/* Export module. */
export default getCoins
