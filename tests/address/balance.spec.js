/* Import modules. */
const Nito = require('../..')

describe('Address:balance', () => {
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
