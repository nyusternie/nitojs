/* Import modules. */
const Nito = require('..')

describe('Crypto:hash', () => {
    test('it should perform a SHA256 hash on a string', async () => {
        /* Calculate hash. */
        const hash = Nito.Crypto.hash('Hello, world', 'sha256')

        /* Set expected hex value. */
        const expected = '4ae7c3b6ac0beff671efa8cf57386151c06e58ca53a78d83f36107316cec125f'

        /* Evaluate test. */
        expect(hash).toEqual(expected)
    })

    test('it should perform a SHA512 (default) hash on a string', async () => {
        /* Calculate hash. */
        const hash = Nito.Crypto.hash('Hello, world')

        /* Set expected hex value. */
        const expected = 'f986313ffca1a20c61fa2cff5cb597f1af10a650aecca497a746e8d11d1b6bf33e9e6a25eb7ba26af2fcfaa70472d8250b908419a188a16e17191fc26f423f52'

        /* Evaluate test. */
        expect(hash).toEqual(expected)
    })

    test('it should perform a "double" SHA256 hash on a string', async () => {
        /* Calculate hash. */
        const hash = Nito.Crypto.hash('Hello, world', 'sha256sha256')

        /* Set expected hex value. */
        const expected = 'd9ebb60edf18fd5bbcc8f01ddb130b4122f74ccac9a1374c85b310a9a0ddddca'

        /* Evaluate test. */
        expect(hash).toEqual(expected)
    })

    test('it should perform a SHA256 and RIPEMD160 hash on a string', async () => {
        /* Calculate hash. */
        const hash = Nito.Crypto.hash('Hello, world', 'sha256ripemd160')

        /* Set expected hex value. */
        const expected = '02a48dfcdae3f658e5118409200b2e072029b566'

        /* Evaluate test. */
        expect(hash).toEqual(expected)
    })
})
