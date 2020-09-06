/* Import modules. */
const Nito = require('../..')

describe('Address:fromXPub', () => {
    test('it should calculate the address from an extended public key', () => {
        /* Initialize extended public key. */
        const xPub = 'xpub6CK8zBzqYEubAJdCD5ViBT2f1LEnXGArodg4G35wxT9CZL1MGgrvDAYizsujTpvGCqUHHE9scR4BdvKSMmHiF8wjE8hWn887rtWnhCGCs6A'

        /* Initialize cash addresses. */
        const cashAddress_0_0 = 'bitcoincash:qzsu6arkaaen2dqvjp0f5pty0z2jq8stes4j4ck9au'
        const cashAddress_0_1 = 'bitcoincash:qz86ycg68jtuvh437h3tstmy5nvssxtjj5d4w3z9pd'
        const cashAddress_1_1 = 'bitcoincash:qpgway4p3vhp9fqzdj95nel2ynd62d6mpgaf3qjctm'

        /* Convert to legacy format. */
        const address_0_0 = Nito.Address.fromXPub(xPub, 'm/0/0')
        const address_0_1 = Nito.Address.fromXPub(xPub, 'm/0/1')
        const address_1_1 = Nito.Address.fromXPub(xPub, 'm/1/1')

        /* Evaluate test. */
        expect(address_0_0).toEqual(cashAddress_0_0)
        expect(address_0_1).toEqual(cashAddress_0_1)
        expect(address_1_1).toEqual(cashAddress_1_1)
    })

})
