/* Import modules. */
const Nito = require('..')

describe('Class:Sub-class', () => {
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

    test('it should generate a 24 word mnemonic phrase', async () => {
        /* Set entropy. */
        const entropy = Buffer.from('9e7b77aaf584deedaac357bf48d9d4d53d496854dd1087393d23f13466ce93f1', 'hex')

        /* Set language. */
        const language = 'English'

        /* Set matching. */
        const matching = 'oyster sweet turkey twelve evil item prison helmet satisfy egg inside price stand reflect fat pear mango size employ tiny edit guard exist decline'

        /* Generate mnemonic. */
        const mnemonic = Nito.Crypto.mnemonic(entropy, language)

        /* Evaluate test. */
        expect(mnemonic.toString()).toEqual(matching)
    })

})
