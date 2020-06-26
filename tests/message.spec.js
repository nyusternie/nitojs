/* Import modules. */
const bch = require('bitcore-lib-cash')
const Nito = require('..')

describe('Message', () => {
    test('it should generate message signature', async () => {
        /* Set WIF. */
        const wif = 'L2zhZXz7EfEDrxatFwXmEGHBAquGemoR4X58r8BeN5NyxcS9LvPa'

        /* Calculate address. */
        const address = bch.PrivateKey(wif).toAddress().toString()

        /* Evaluate test. */
        expect(address).toEqual('bitcoincash:qrpnygzvj7px2ddt7h5d0vgplndzw5wstgk4209wf8')

        /* Set message. */
        const message = 'Hello, world'

        /* Calculate signature. */
        const signature = Nito.Message.sign(wif, message)

        /* Evaluate test. */
        expect(signature).toHaveLength(88)
    })

    test('it should verify message signature', async () => {
        /* Set address. */
        const address = 'bitcoincash:qrpnygzvj7px2ddt7h5d0vgplndzw5wstgk4209wf8'

        /* Set message. */
        const message = 'Hello, world'

        /* Set signature. */
        const signature = 'IPeqTAewqg544YklJeww9CrTuOsGtXU29TdVZQVpoalcJe3qbhl3xv/iNDfXj02tD86ziMG7xfUqM6o42PxN1n8='

        /* Handle verification. */
        const verification = Nito.Message.verify(address, signature, message)

        /* Evaluate test. */
        expect(verification).toBeTruthy()
    })
})
