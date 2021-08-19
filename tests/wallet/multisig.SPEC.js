/* Import modules. */
const Nito = require('../..')

describe('Wallet:tostring', () => {
    test('it should convert a multisig (wallet) into a readable (cash address) string', () => {
        /* Initialize 3 private keys. */
        const privateKeys = [
            Nito.Crypto.PrivateKey('L15iUH4nhFUvkg2uBtkumMgDgkFxLbsUKpCAqFVrDjUKWAUXL12X'),
            Nito.Crypto.PrivateKey('KyVP38d1DebS7rTBKNrF1dNJsKpr7QH3DKyXir8J2TbW93ikmz8e'),
            Nito.Crypto.PrivateKey('L3pNciKh2g1witySvvbqixxzFYj7yFKGUtxGbBWcRADKghfhf3u5'),
        ]

        /* Map the public keys. */
        const mappedKeys = privateKeys.map(Nito.Crypto.PublicKey)

        /* Set required number of signatures. */
        const numSigs = 2

        /* Build parameters. */
        const params = {
            mappedKeys,
            numSigs,
        }

        /* Generate a node from 2-of-3 multisig. */
        const node = new Nito.Wallet(params)

        /* Initialize cash address. */
        const cashAddress = 'bitcoincash:ppty0g202tc5lk652y64m9z8kuhgthrnwvq6nh047x'

        /* Evaluate test. */
        expect(node.toString()).toEqual(cashAddress)
    })

})
