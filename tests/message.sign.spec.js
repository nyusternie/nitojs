/* Import modules. */
const bch = require('bitcore-lib-cash')
const Nito = require('..')

describe('Message:sign', () => {
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
        const signature = Nito.Message.sign(message, wif)

        /* Evaluate test. */
        expect(signature).toHaveLength(88)
    })
})
