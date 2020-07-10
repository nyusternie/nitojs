/* Import modules. */
const Nito = require('..')

describe('Utils:encodeNumber', () => {
    test('it should encode an output value', async () => {
        /* Set satoshis. */
        const satoshis = 13370000

        /* Encode value. */
        const encoded = Nito.Utils.encodeNumber(satoshis)

        /* Set expected. */
        const expected = Buffer.from('9002cc0000000000', 'hex')

        /* Evaluate test. */
        expect(encoded).toEqual(expected)
    })
})
