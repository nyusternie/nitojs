/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
* Get Ticker
*/
const getTicker = () => async (_currency) => {
    try {
        /* Retrieve ticker price. */
        // NOTE: Returns promise.
        const ticker = bitbox.Price.current(_currency)

        /* Return ticker. */
        return ticker
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default getTicker
