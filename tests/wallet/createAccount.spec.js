/* Import modules. */
const Nito = require('../..')
// const bch = require('bitcore-lib-cash')

/* Initialize (32-bit seed) key. */
const seed_32 = '56050fd980e61dba97de474a3738c9e24c258cbd72280f87e6feee9893cf1407'

/* Initialize (mnemonic phrase) key. */
const mnemonic = 'figure chronic wait achieve gift tail garage similar enforce right crash setup seat shock volume eagle auto dish sausage tag matrix travel exotic wrestle'

describe('Wallet:createAccount', () => {
    test('it should create a new wallet account (from 32-bit seed)', async () => {
        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(seed_32)

        /* Set extended private key. */
        // const extPrivKey = wallet.accounts[0].toString()
        const extPrivKey = wallet.node.toString()

        /* Set expected. */
        const expected = 'xprv9xxqPm59L1yzhWNWSYEuuMPSvWwUd1PKzgYPrP6vXjrinw3KGF6h4YcMnMxfyWKVFi8Lcp5jtWXT6npnwT8TX6PnQ2J9Bgd1g3eK4Xyxqmb'

        /* Evaluate test. */
        expect(extPrivKey).toEqual(expected)
    })

    test('it should create a new wallet account (from mnemonic phrase)', async () => {
        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(mnemonic)

        /* Set extended private key. */
        const extPrivKey = wallet.node.toString()

        /* Set expected (extdended) private key. */
        const expected = 'xprv9xxqPm59L1yzhWNWSYEuuMPSvWwUd1PKzgYPrP6vXjrinw3KGF6h4YcMnMxfyWKVFi8Lcp5jtWXT6npnwT8TX6PnQ2J9Bgd1g3eK4Xyxqmb'

        /* Evaluate test. */
        expect(extPrivKey).toEqual(expected)
    })

    test('it should generate a public key (from mnemonic phrase)', async () => {
        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(mnemonic)

        /* Retrieve extended public key. */
        const extPubKey = wallet.toPubKey()

        /* Set expected (extdended) public key. */
        const expected = 'xpub6BxBoGc3APYHuzSyYZmvGVLBUYmy2U7BMuTzemWY65PhfjNTonQwcLvqdcsZaoaoGMdwSW9RNjPU1fMRkj8qDaCRnJJv9cf3EUdU7JyM4Jk'

        /* Evaluate test. */
        expect(extPubKey).toEqual(expected)
    })

    test('it should generate an address (from mnemonic phrase)', async () => {
        /* Instantiate new wallet. */
        const wallet = new Nito.Wallet(mnemonic)

        /* Set "first child" path. */
        const path = 'm/0/0'

        /* Initialize "first child" node. */
        const childNode = wallet.node.deriveChild(path)

        /* Derive address. */
        const address = new Nito.Address(childNode.publicKey).toString()

        /* Set expected address. */
        const expected = 'bitcoincash:qz2nj9frrncm2ksn7t4kc2l62vfvc4szwgq6nxl90n'

        /* Evaluate test. */
        expect(address).toEqual(expected)
    })
})
