/* Import modules. */
const Nito = require('../index')

describe('Status evaluation', () => {
    test('it should report the current server status', () => {
        /* Set (expected) output. */
        const output = [{ id: 1, message: 'ok' }]

        /* Initialize Nito. */
        const nito = new Nito()

        /* Run test. */
        expect(nito.status()).toEqual(output[0])
    })
})
