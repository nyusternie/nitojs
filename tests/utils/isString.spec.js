/* Import modules. */
const Nito = require('../..')

describe('Utils:isString', () => {
    test('it should test a valid string', async () => {
        /* Set string. */
        const str = 'Hello Bitcoin!'

        /* Encode value. */
        const isString = Nito.Utils.isString(str)

        /* Evaluate test. */
        expect(isString).toBeTruthy()
    })

    test('it should test a invalid string', async () => {
        /* Set (non-) string. */
        const str = 1337

        /* Encode value. */
        const isString = Nito.Utils.isString(str)

        /* Evaluate test. */
        expect(isString).toBeFalsy()
    })
})
