/* Import modules. */
const Nito = require('../..')

describe('Purse:fromWIF', () => {
    test('it should initialize a node from its WIF', async () => {
        /* Initialize WIF. */
        const wif = 'KxzMaq6eFVJFPaEM7UH7yG8nCFNmNBPHZYPakNAVBcEm7eGrDnSc'

        /* Instantiate new purse. */
        const purse = new Nito.Purse(wif)

        /* Set cash address. */
        const cashAddress = purse.toAddress().toString()

        /* Set expected. */
        const expected = 'bitcoincash:qrk3ykhr7ssrl6nc50xfcgur703h5cjkguxkk0tjxc'

        /* Evaluate test. */
        expect(cashAddress).toEqual(expected)
    })
})
