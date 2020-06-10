/* Import modules. */
const Nito = require('../index')

;(async () => {
    const txid = '5cd9fdf3cbed66305daf736b0c2ad1e01773b9a64b1d2d35cb4a0256c6b20092'
    const verbose = false

    const result = await Nito.Transaction.getRawTransaction(txid, verbose)
    console.log('RESULT', result);
})()
