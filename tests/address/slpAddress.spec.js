/* Import modules. */
const Nito = require('../..')

describe('Address:slpAddress', () => {
    test('it should convert a cash address to an slp address format', () => {
        /* Initialize cash address. */
        const cashAddress = 'bitcoincash:qzedgpdunwvx3z648554aqz3cj868phe4q8x6qlqh9'

        /* Convert to legacy format. */
        const address = Nito.Address.toSlpAddress(cashAddress)

        /* Evaluate test. */
        expect(address).toEqual('simpleledger:qzedgpdunwvx3z648554aqz3cj868phe4qta3m2qfm')
    })

    test('it should convert an slp address to a cash address format', () => {
        /* Initialize SLP address. */
        const slpAddress = 'simpleledger:qzedgpdunwvx3z648554aqz3cj868phe4qta3m2qfm'

        /* Convert to legacy format. */
        const address = Nito.Address.toCashAddress(slpAddress)

        /* Evaluate test. */
        expect(address).toEqual('bitcoincash:qzedgpdunwvx3z648554aqz3cj868phe4q8x6qlqh9')
    })

})
