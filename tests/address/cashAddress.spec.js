/* Import modules. */
const Nito = require('../..')

describe('Address:cashAddress', () => {
    test('it should convert a legacy address to cash address format', () => {
        /* Initialize legacy address. */
        const legacyAddress = '1KLhURVwWqmoMYCxYeTcywuGE9EGeH1FKd'

        /* Convert to legacy format. */
        const address = Nito.Address.toCashAddress(legacyAddress)

        /* Evaluate test. */
        expect(address).toEqual('bitcoincash:qryjhu7wclse7dz2guc22sdk2kea9ma37c6q0gzsrp')
    })

})
