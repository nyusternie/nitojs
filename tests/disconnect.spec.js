/* Import modules. */
const NitoExchangeCloud = require('../index')

describe('Disconnection evaluation', () => {
    test('it should report the current connection status', () => {
        /* Initialize Nito Exchange Cloud. */
        const nec = new NitoExchangeCloud()

        /* Run test. */
        expect(nec.disconnect()).toEqual(0)
    })
})
