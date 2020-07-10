/* Import modules. */
const Nito = require('..')

describe('Utils:reverseBuffer', () => {
    test('it should reverse bytes of a buffer', async () => {
        /* Set message. */
        const message = 'Hello, world'

        /* Set buffer. */
        const buf = Buffer.from(message)

        /* Set (reversed) buffer. */
        const reversedBuf = Nito.Utils.reverseBuffer(buf)

        /* Set (expected) message. */
        const reversedMessage = 'dlrow ,olleH'

        /* Set (expected) buffer. */
        const expectedBuf = Buffer.from(reversedMessage)

        /* Evaluate test. */
        expect(reversedBuf).toEqual(expectedBuf)
    })
})
