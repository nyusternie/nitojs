try {
    /* Import core library. */
    const Pedersen = require('../libs/pedersen')

    /* Initialize p. */
    const p = '925f15d93a513b441a78826069b4580e3ee37fc5'

    /* Initialize g (Generator). */
    const g = '959144013c88c9782d5edd2d12f54885aa4ba687'

    /* Initialize Pedersen. */
    const pederson = new Pedersen(p, g)

    /* Initialize secrets. */
    const secrets = {}

    /* Initialize i (counter). */
    let i = 0

    /* Loop 100 times. */
    while (i < 100) {
        /* Create new Pedersen secret. */
        const secret = pederson.newSecret()

        /* Validate Pedersen secret. */
        if (secret.length !== 40) {
            throw new Error('Generated invalid key.')
        }

        /* Set secret flag. */
        secrets[secret] = true

        /* Increment counter. */
        i++
    }

    /* Validate secrets. */
    if (Object.keys(secrets).length !== 100) {
        throw new Error('Basic secret collision test failed.')
    }

    /* Initialize secret. */
    const secret = '1184c47884aeead9816654a63d4209d6e8e906e29'

    /* Initialize test A. */
    const testA = pederson
        .commit('1', secret, 'e93c58e6f7f3f4b6f6f0e55f3a4191b87d58b7b1')
    console.log('\nTest A', testA) // eslint-disable-line no-console

    /* Set assertion A. */
    const assertionA = [
        '4b7680d6262cea707175d55e862a09ba71b55655',
        'e93c58e6f7f3f4b6f6f0e55f3a4191b87d58b7b1'
    ]

    /* Validate test A. */
    if (testA.toString() !== assertionA.toString()) {
        throw new Error('Arbitrary signature test A failed.')
    }

    /* Initialize test B. */
    const testB = pederson
        .commit('2', secret, 'ba1303c4f29bd959f585dc0dcfb3dbd0cebecd48')
    console.log('\nTest B', testB) // eslint-disable-line no-console

    /* Set assertion B. */
    const assertionB = [
        'ff5ad287a51bffddedaf342dfa685b0cf82286ce',
        'ba1303c4f29bd959f585dc0dcfb3dbd0cebecd48'
    ]

    /* Validate test B. */
    if (testB.toString() !== assertionB.toString()) {
        throw new Error('Arbitrary signature test B failed.')
    }

    /* Initialize test C. */
    const testC = pederson.combine([testA, testB])
    console.log('\nTest C', testC) // eslint-disable-line no-console

    /* Set assertion C. */
    const assertionC = [
        '71e6ef28ea611f23d2240e4a786edc14611c96a3',
        '1a34f5cabea8fce10ec76c16d09f56d894c1784f9'
    ]

    /* Validate test C (combined test A and test B). */
    if (testC.toString() !== assertionC.toString()) {
        throw new Error('Arbitrary signature combination failed.')
    }

    /* Perform verification for test A. */
    if (!pederson.verify('1', [testA], secret)) {
        throw new Error('Arbitrary verification test A failed.')
    }

    /* Perform verification for test B. */
    if (!pederson.verify('2', [testB], secret)) {
        throw new Error('Arbitrary verification test B failed.')
    }

    /* Perform verification for test C (combination of test A and test B). */
    if (!pederson.verify('3', [pederson.combine([testA, testB])], secret)) {
        throw new Error('Combined verifcation test failed.')
    }

    /* Set message. */
    const message = 'aaaaaaaaaa'

    /* Initialize test D. */
    const testD = pederson
        .commit(message, secret, 'ba1303c4f29bd959f585dc0dcfb3dbd0cebecd48')
    console.log('\nTest D', testD) // eslint-disable-line no-console

    /* Perform verification for test D. */
    if (!pederson.verify(message, [testD], secret)) {
        throw new Error('Random verification test D failed.')
    }

    /* Set new Pedersen secret. */
    secret = pederson.newSecret()

    /* Initialize test E. */
    const testE = pederson.commit(message, secret)
    console.log('\nTest E', testE) // eslint-disable-line no-console

    /* Perform verification for test E. */
    if (!pederson.verify(message, [testE], secret)) {
        throw new Error('End-to-end test E failed.')
    }

    console.log('\n✅ All Pedersen tests passed!\n') // eslint-disable-line no-console
} catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('\n⚠️ Failed to test pedersen commitments:', error)

    throw new Error(error)
}
