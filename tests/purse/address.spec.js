/* Import modules. */
const Nito = require('../..')

describe('Purse:address', () => {
    test('it should convert a (purse) node to a cash address', async () => {
        /* Initialize WIF. */
        const wif = 'KxzMaq6eFVJFPaEM7UH7yG8nCFNmNBPHZYPakNAVBcEm7eGrDnSc'

        /* Instantiate new purse. */
        const purse = new Nito.Purse(wif)

        /* Set cash address. */
        const cashAddress = purse.address // NOTE: Alias to `cashAddress`.

        /* Set expected. */
        const expected = 'bitcoincash:qrk3ykhr7ssrl6nc50xfcgur703h5cjkguxkk0tjxc'

        /* Evaluate test. */
        expect(cashAddress).toEqual(expected)
    })

    test('it should convert a (purse) node to a legacy address', async () => {
        /* Initialize WIF. */
        const wif = 'KxzMaq6eFVJFPaEM7UH7yG8nCFNmNBPHZYPakNAVBcEm7eGrDnSc'

        /* Instantiate new purse. */
        const purse = new Nito.Purse(wif)

        /* Set legacy address. */
        const legacyAddress = purse.legacyAddress

        /* Set expected. */
        const expected = '1NcX8o5NNG1X9f4m6Nj4a81CDWqSzSs7ou'

        /* Evaluate test. */
        expect(legacyAddress).toEqual(expected)
    })
})
