/* Import modules. */
const Nito = require('../..')

describe('Blockchain:query', () => {
    test('it should report the UTXO is spent', async () => {
        /* Set transaction id. */
        const txid = '5cd9fdf3cbed66305daf736b0c2ad1e01773b9a64b1d2d35cb4a0256c6b20092'

        /* Set output index. */
        const vout = 0

        /* Run test. */
        const isSpent = await Nito.Blockchain.Query.isSpent(txid, vout)

        /* Evaluate test. */
        expect(isSpent).toBeTruthy()
    })

    test('it should report the UTXO is unspent', async () => {
        /* Set transaction id. */
        const txid = '5cd9fdf3cbed66305daf736b0c2ad1e01773b9a64b1d2d35cb4a0256c6b20092'

        /* Set output index. */
        const vout = 1

        /* Run test. */
        const isSpent = await Nito.Blockchain.Query.isSpent(txid, vout)

        /* Evaluate test. */
        expect(isSpent).toBeFalsy()
    })
})
