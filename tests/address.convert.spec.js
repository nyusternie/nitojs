/* Import modules. */
const Nito = require('..')

describe('Address', () => {
    test('it should convert cash address to legacy format', async () => {
        /* Initialize cash address. */
        const cashAddress = 'bitcoincash:qryjhu7wclse7dz2guc22sdk2kea9ma37c6q0gzsrp'

        /* Convert to legacy format. */
        const address = Nito.Address.toLegacyAddress(cashAddress)

        /* Evaluate test. */
        expect(address).toEqual('1KLhURVwWqmoMYCxYeTcywuGE9EGeH1FKd')
    })

    test('it should convert a legacy address to cash address format', async () => {
        /* Initialize legacy address. */
        const legacyAddress = '1KLhURVwWqmoMYCxYeTcywuGE9EGeH1FKd'

        /* Convert to legacy format. */
        const address = Nito.Address.toCashAddress(legacyAddress)

        /* Evaluate test. */
        expect(address).toEqual('bitcoincash:qryjhu7wclse7dz2guc22sdk2kea9ma37c6q0gzsrp')
    })

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

    test('it should retrieve both confirmed and unconfirmed address balances', async () => {
        /* Initialize legacy address. */
        const address = 'bitcoincash:qqm43s4w69pn4uuf0yzfnqeqrw6lajvdaqkpjwkwgw'

        /* Request address balances. */
        const balances = await Nito.Address.balance(address)

        /* Evaluate test. */
        expect(balances.confirmed).toBeGreaterThanOrEqual(0)
        expect(balances.unconfirmed).toBeGreaterThanOrEqual(0)
    })

})
