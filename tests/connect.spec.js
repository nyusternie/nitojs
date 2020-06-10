/* Import modules. */
const Nito = require('../index')

describe('Connection evaluation', () => {
    test('it should report the current connection status', () => {
        /* Initialize Nito Exchange Cloud. */
        const nec = new Nito()

        /* Run test. */
        expect(nec.connect()).toEqual(1)
    })
})
