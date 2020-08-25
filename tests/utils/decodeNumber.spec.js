/* Import modules. */
const Nito = require('../..')

describe('Utils:decodeNumber', () => {
    test('it should decode a buffer value', async () => {
        /* Set encoded value. */
        const encoded = Buffer.from('9002cc0000000000', 'hex')

        /* Decoded value. */
        const decoded = Nito.Utils.decodeNumber(encoded)

        /* Set expected. */
        const expected = 13370000

        /* Evaluate test. */
        expect(decoded).toEqual(expected)
    })
})
