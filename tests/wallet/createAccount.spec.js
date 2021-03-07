/* Import modules. */
const Nito = require('../..')

describe('Wallet:createAccount', () => {
    test('it should create a new wallet account (from 32-bit seed)', async () => {
        /* Initialize (32-bit seed) key. */
        const key = '56050fd980e61dba97de474a3738c9e24c258cbd72280f87e6feee9893cf1407'

        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(key)

        /* Set cash address. */
        const cashAddress = wallet.accounts[0].toString()

        /* Set expected. */
        const expected = 'xprv9s21ZrQH143K2GhnNaw5vEUP8RWgeqbbVB8oPE6ASdm3Laqt9GU5v69a3LFR53dnP7VbVZknJ1tcaFwwgiPkJbcAYufGwrjQ49QP82MbdRZ'

        /* Evaluate test. */
        expect(cashAddress).toEqual(expected)
    })

    test('it should create a new wallet account (from mnemonic phrase)', async () => {
        /* Initialize (mnemonic phrase) key. */
        const key = 'figure chronic wait achieve gift tail garage similar enforce right crash setup seat shock volume eagle auto dish sausage tag matrix travel exotic wrestle'

        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(key)

        /* Set cash address. */
        const cashAddress = wallet.accounts[0].toString()

        /* Set expected. */
        const expected = 'xprv9s21ZrQH143K2GhnNaw5vEUP8RWgeqbbVB8oPE6ASdm3Laqt9GU5v69a3LFR53dnP7VbVZknJ1tcaFwwgiPkJbcAYufGwrjQ49QP82MbdRZ'

        /* Evaluate test. */
        expect(cashAddress).toEqual(expected)
    })
})
