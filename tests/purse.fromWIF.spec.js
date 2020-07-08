/* Import modules. */
const Nito = require('..')

describe('Purse:fromWIF', () => {
    test('it should initialize a coin from its WIF', async () => {
        /* Initialize WIF. */
        const wif = 'KxzMaq6eFVJFPaEM7UH7yG8nCFNmNBPHZYPakNAVBcEm7eGrDnSc'

        /* Initialize coin. */
        const coin = Nito.Purse.fromWIF(wif)

        /* Set cash address. */
        const cashAddress = coin.toAddress().toString()

        /* Set expected. */
        const expected = 'bitcoincash:qrk3ykhr7ssrl6nc50xfcgur703h5cjkguxkk0tjxc'

        /* Evaluate test. */
        expect(cashAddress).toEqual(expected)
    })
})
