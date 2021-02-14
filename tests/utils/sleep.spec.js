/* Import modules. */
const Nito = require('../..')

describe('Utils:sleep', () => {
    test('it should wait 1 second for an execution break', async () => {
        /* Initialize start time. */
        const start = new Date()

        /* Wait 1 second. */
        await Nito.Utils.sleep(1 * 1000) // 1 second

        /* Calculate duration. */
        const duration = new Date() - start

        /* Evaluate test. */
        expect(duration).toBeGreaterThanOrEqual(1 * 1000) // 1 second
        expect(duration).toBeLessThanOrEqual(1.5 * 1000) // 1.5 seconds
    })

    test('it should wait 53seconds for an execution break', async () => {
        /* Initialize start time. */
        const start = new Date()

        /* Wait 1 second. */
        await Nito.Utils.sleep(3 * 1000) // 3 seconds

        /* Calculate duration. */
        const duration = new Date() - start

        /* Evaluate test. */
        expect(duration).toBeGreaterThanOrEqual(3 * 1000) // 3 seconds
        expect(duration).toBeLessThanOrEqual(3.5 * 1000) // 3.5 seconds
    })
})
