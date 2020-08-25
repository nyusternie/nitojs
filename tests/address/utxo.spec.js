/* Import modules. */
const Nito = require('../..')

describe('Address:UTXO', () => {
    test('it should retrieve UTXOs and provide address data', async () => {
        /* Initialize address. */
        const address = 'bitcoincash:qryjhu7wclse7dz2guc22sdk2kea9ma37c6q0gzsrp'

        /* Initialize compatiblity. */
        const compatiblity = true

        /* Set expected UTXOs. */
        const expected = []

        /* Request UTXOs. */
        const utxos = await Nito.Address.utxo(address, compatiblity)

        /* Evaluate test. */
        expect(utxos.utxos).toEqual(expect.arrayContaining(expected))
        expect(utxos.legacyAddress).toEqual('1KLhURVwWqmoMYCxYeTcywuGE9EGeH1FKd')
        expect(utxos.scriptPubKey).toEqual('76a914c92bf3cec7e19f344a4730a541b655b3d2efb1f688ac')
    })

})
