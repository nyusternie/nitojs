/* Import modules. */
const Nito = require('../..')

describe('Address:fromXPub', () => {
    test('it should calculate the address(es) from an extended public key', () => {
        /* Initialize extended public key. */
        const xPub = 'xpub6BxBoGc3APYHuzSyYZmvGVLBUYmy2U7BMuTzemWY65PhfjNTonQwcLvqdcsZaoaoGMdwSW9RNjPU1fMRkj8qDaCRnJJv9cf3EUdU7JyM4Jk'

        /* Initialize cash addresses. */
        const cashAddress_0_0 = 'bitcoincash:qz2nj9frrncm2ksn7t4kc2l62vfvc4szwgq6nxl90n'
        const cashAddress_0_1 = 'bitcoincash:qpwt3swrnaf2gzugveknvs8nn00wxfyaqvjarmnz2j'
        const cashAddress_1_1 = 'bitcoincash:qpc230hl4mrl6m43tan6mg833mja50qsxgkejn6d3w'

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
