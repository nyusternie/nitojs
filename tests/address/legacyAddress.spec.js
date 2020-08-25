/* Import modules. */
const Nito = require('../..')

describe('Address:legacyAddress', () => {
    test('it should convert cash address to legacy format', () => {
        /* Initialize cash address. */
        const cashAddress = 'bitcoincash:qryjhu7wclse7dz2guc22sdk2kea9ma37c6q0gzsrp'

        /* Convert to legacy format. */
        const address = Nito.Address.toLegacyAddress(cashAddress)

        /* Evaluate test. */
        expect(address).toEqual('1KLhURVwWqmoMYCxYeTcywuGE9EGeH1FKd')
    })

})
