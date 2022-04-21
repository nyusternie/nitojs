/* Import modules. */
const Nito = require('../..')

describe('Crypto:encryption', () => {
    test('it should verify that ciphertext is unique for the same plaintext', async () => {
        /* Initialize public key. */
        // NOTE: Address is bitcoincash:qppv9s692qudqk4x3etsndhsu3fuuvvdqvklhyn7jj
        const pubKey = '02316e0085ee32e2b949eb03fdd40bc6fd57bf46b4d9b1ed2ed90bba0291ad7ea4'

        /* Initialize plaintext message. */
        const plaintext = 'Chancellor on brink of second bailout for banks'

        /* Generate random bytes. */
        const ciphertext = Nito.Crypto.Encryption.encrypt(plaintext, pubKey)

        /* Generate random bytes. */
        const ciphertext_verify = Nito.Crypto.Encryption.encrypt(plaintext, pubKey)

        /* Evaluate test. */
        expect(ciphertext).not.toEqual(ciphertext_verify)
    })

    test('it should verify that ciphertext can be decrypted', async () => {
        /* Initialize WIF. */
        // NOTE: Address is bitcoincash:qppv9s692qudqk4x3etsndhsu3fuuvvdqvklhyn7jj
        const wif = 'KzBAnwuor1KaVu192x26R2FVucQbrNGVVYi5tVgKVSHHnT4WGXSv'

        /* Initialize ciphertext. */
        const ciphertext = 'QklFMQJO98eqhDMm9M1SwgGXxeXH8Fg8VYdXAm8lFngIxltZNhUJ0WD0PYyYmFR8tAooHuN/bPF1pk4JnFgvTb4FmwAS6u8+hdfbRmCiZ9nAgigLElVgtc7U+7k8Ohx3ix2iCfFcF5EJewArzErlzD53k2qk'

        /* Initialize expected text. */
        const expected = 'Chancellor on brink of second bailout for banks'

        /* Decrypt ciphertext. */
        // NOTE: Returns a buffer object.
        const plaintext = Nito.Crypto.Encryption.decrypt(ciphertext, wif)

        /* Evaluate test. */
        expect(plaintext.toString()).toEqual(expected)
    })
})
