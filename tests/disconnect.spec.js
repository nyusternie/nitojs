/* Import modules. */
const Nito = require('..')

describe('Disconnection evaluation', () => {
    test('it should report the current connection status', () => {
        /* Initialize Nito Exchange Cloud. */
        const nec = new Nito()

        /* Run test. */
        expect(nec.disconnect()).toEqual(0)
    })
})
