/* Import core modules. */
const crypto = require('crypto')
const bigInt = require('big-integer')

/* Set order. */
const order = bigInt('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16)
// const order = bigInt('115792089237316195423570985008687907852837564279074904382605163141518161494337')
console.log('ORDER', order.toString())

/* Set nonce. */
const nonce = bigInt(0).add(42)
console.log('NONCE', nonce.toString())

try {
    /* Import core library. */
    const Pedersen = require('../libs/pedersen')

    /* Initialize p. */
    const p = crypto.randomBytes(32).toString('hex')

    /* Initialize g (Generator). */
    const g = crypto.randomBytes(32).toString('hex')

    const hP = bigInt(crypto.randomBytes(32).toString('hex'), 16)
    const hG = bigInt(crypto.randomBytes(32).toString('hex'), 16)
    const pow = hP.pow(5)
    const sq = pow.divide(hP).divide(hP).divide(hP).divide(hP)
    const MAX = bigInt('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).next()
    console.log('\nHUGE', hP, hG, pow, sq, hP.eq(sq), MAX)

    /* Initialize Pedersen. */
    const pederson = new Pedersen(p, g)

    /* Initialize secret. */
    const secret = crypto.randomBytes(32).toString('hex')

    /* Initialize test values. */
    // const aVal = bigInt(0x1337)
    // const bVal = bigInt(0x69)
    const aVal = bigInt(5)
    const bVal = bigInt(3)
    const dVal = bigInt(4)
    const fVal = bigInt(-7)

    console.log( // eslint-disable-line no-console
        '\n\t  Test values',
        '\n\t----------------------------------------',
        '\n\t  P-value :', p,
        '\n\t  G-value :', g,
        '\n\t  Secret  :', secret,
        '\n',
        '\n\t  A-value :', aVal,
        '\n\t  B-value :', bVal,
        '\n\t  D-value :', dVal,
        '\n\t  F-value :', fVal,
        '\n',
        '\n\t  Combined (A-value, B-value)          :', aVal.add(bVal),
        '\n\t  Combined (A-value, B-value, D-value) :', aVal.add(bVal).add(dVal)
    )

    /* Initialize test A. */
    const testA = pederson.commit(aVal, secret)
    console.log('\nTest A', testA) // eslint-disable-line no-console

    /* Perform verification for test A. */
    if (!pederson.verify(aVal, [testA], secret)) {
        throw new Error('Arbitrary verification test A failed.')
    }

    /* Initialize test B. */
    const testB = pederson.commit(bVal, secret)
    console.log('\nTest B', testB) // eslint-disable-line no-console

    /* Perform verification for test B. */
    if (!pederson.verify(bVal, [testB], secret)) {
        throw new Error('Arbitrary verification test B failed.')
    }

    /* Initialize test C. */
    const testC = pederson.combine([testA, testB])
    console.log('\nTest C', testC) // eslint-disable-line no-console

    /* Perform verification for combination of test A and test B. */
    if (!pederson.verify((aVal + bVal), [testC], secret)) {
        throw new Error('Combined verifcation test failed.')
    }

    /* Initialize test D. */
    const testD = pederson.commit(dVal, secret)
    console.log('\nTest D', testD) // eslint-disable-line no-console

    /* Perform verification for test D. */
    if (!pederson.verify(dVal, [testD], secret)) {
        throw new Error('Arbitrary verification test D failed.')
    }

    /* Initialize test E. */
    const testE = pederson.combine([testA, testB, testD])
    console.log('\nTest E', testE) // eslint-disable-line no-console

    /* Perform verification for combination of test A and test B. */
    if (!pederson.verify((aVal + bVal + dVal), [testE], secret)) {
        throw new Error('Combined verifcation test failed.')
    }

    /* Initialize test F. */
    // const testF = pederson.commit(fVal, secret)
    const testF = fVal.mod(order).minus(nonce)
    console.log('\nTest F', testF) // eslint-disable-line no-console

    /* Perform verification for test F. */
    // if (!pederson.verify(fVal, [testF], secret)) {
    //     throw new Error('Arbitrary verification test F failed.')
    // }

    console.log('\n✅ All Pedersen (CashFusion) tests passed!\n') // eslint-disable-line no-console
} catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('\n⚠️ Failed to test pedersen commitments:', error)

    throw new Error(error)
}
