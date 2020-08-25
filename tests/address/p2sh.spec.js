/* Import modules. */
const Nito = require('../..')

describe('Address:p2sh', () => {
    test('it should convert a public script hash to a cash address', () => {
        /* Initialize public key (script) hash. */
        const scriptPubKey = 'a914e8f3b3d3ceea2d7b8750ef400161c6162b3b484b87'

        /* Convert to cash address. */
        const cashAddress = Nito.Address.toCashAddress(scriptPubKey)

        /* Evaluate test. */
        expect(cashAddress).toEqual('bitcoincash:pr508v7nem4z67u82rh5qqtpcctzkw6gfvdyvk6ag2')
    })

    test('it should convert a cash address to public script hash', () => {
        /* Initialize public key (script) hash. */
        const cashAddress = 'bitcoincash:pr508v7nem4z67u82rh5qqtpcctzkw6gfvdyvk6ag2'

        /* Convert to cash address. */
        const pubKeyHash = Nito.Address.toPubKeyHash(cashAddress)

        /* Expected result. */
        const expected = 'a914e8f3b3d3ceea2d7b8750ef400161c6162b3b484b87'

        /* Evaluate test. */
        expect(pubKeyHash).toEqual(expected)
    })

})
