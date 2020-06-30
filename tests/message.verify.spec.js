/* Import modules. */
const Nito = require('..')

describe('Message:verify', () => {
    test('it should verify message signature', async () => {
        /* Set message. */
        const message = 'Hello, world'

        /* Set address. */
        const address = 'bitcoincash:qrpnygzvj7px2ddt7h5d0vgplndzw5wstgk4209wf8'

        /* Set signature. */
        const signature = 'II3R9zV/jwJUhb8JttR6XNzEQwoBqipiH31Bo+pJ2b5Efud1B79+rTGLW11bSRtr+fKtBqqCBa75npG5puZLSl8='

        /* Handle verification. */
        const verification = Nito.Message.verify(message, address, signature)

        /* Evaluate test. */
        expect(verification).toBeTruthy()
    })
})
