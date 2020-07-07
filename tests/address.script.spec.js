/* Import modules. */
const Nito = require('..')

describe('Address:script', () => {
    test('it should convert a public script hash to a cash address', () => {
        /* Initialize public key (script) hash. */
        const scriptPubKey = '76a9148fb0c71c80a56e583f22567a34f0135fdc7c2a9488ac'

        /* Convert to cash address. */
        const cashAddress = Nito.Address.toCashAddress(scriptPubKey)

        /* Evaluate test. */
        expect(cashAddress).toEqual('bitcoincash:qz8mp3cuszjkukplyft85d8szd0aclp2jslnhezsze')
    })

    test('it should convert a cash address to public script hash', () => {
        /* Initialize public key (script) hash. */
        const cashAddress = 'bitcoincash:qz8mp3cuszjkukplyft85d8szd0aclp2jslnhezsze'

        /* Convert to cash address. */
        const pubKeyHash = Nito.Address.toPubKeyHash(cashAddress)

        /* Expected result. */
        const expected = '76a9148fb0c71c80a56e583f22567a34f0135fdc7c2a9488ac'

        /* Evaluate test. */
        expect(pubKeyHash).toEqual(expected)
    })

})
