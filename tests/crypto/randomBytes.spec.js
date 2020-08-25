/* Import modules. */
const Nito = require('../..')

describe('Crypto:randomBytes', () => {
    test('it should check the length of random bytes', async () => {
        /* Initialize byte size. */
        const byteSize = 32

        /* Generate random bytes. */
        const bytes = Nito.Crypto.randomBytes(byteSize)

        /* Evaluate test. */
        expect(bytes).toHaveLength(32)
    })

    test('it should check the length of random (hex) bytes', async () => {
        /* Initialize byte size. */
        const byteSize = 32

        /* Generate random (hex) bytes. */
        const bytes = Nito.Crypto.randomBytes(byteSize).toString('hex')

        /* Evaluate test. */
        expect(bytes).toHaveLength(byteSize * 2)
    })
})
