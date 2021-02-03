/* Import modules. */
const bch = require('bitcore-lib-cash')
// const Nito = require('../..')

describe('Transaction:sign', () => {
    test('it should test a transaction signature', async () => {
        /* Set WIF. */
        const wif = 'L2zhZXz7EfEDrxatFwXmEGHBAquGemoR4X58r8BeN5NyxcS9LvPa'

        /* Initialize private key. */
        const privateKey = new bch.PrivateKey(wif)

        /* Initialize transaction. */
        const transaction = new bch.Transaction()

        /* Sign transaction. */
        // TODO: How do we test this signature is valid??
        transaction.sign(privateKey)
        // console.log('TRANSACTION', transaction)
        // console.log('TRANSACTION (hex)', transaction.toString())

        /* Evaluate test. */
        // NOTE: This library defaults to version 2
        expect(transaction.toString()).toEqual('02000000000000000000')
    })
})
