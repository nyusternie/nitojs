/*
Most of this code was borrowed with permission from
Cliford Symack - https://github.com/clifordsymack/
*/

/* Import core modules. */
const crypto = require('crypto')
const PrivateKey = require('bitcore-lib-cash').PrivateKey
const PublicKey = require('bitcore-lib-cash').PublicKey

/**
 * Encryption Class
 */
class Encryption {
    constructor() {

    }

    /**
     * Encrypt
     *
     * Encrypts a text message for public key.
     */
    static encrypt(_plaintextMessage, _pubkey) {
        /* Initialize public key. */
        const publicKey = PublicKey(_pubkey)

        /* Initialize ephemeral (private key). */
        const ephemeral = new PrivateKey()

        /* Set ECDH key. */
        // NOTE: This is our shared secret with the pubkey holder.
        const ecdhKey = PublicKey(
            publicKey.point.mul(ephemeral.toBigNumber())).toBuffer()

        /* Set key. */
        // NOTE: We hash the shared secret as:
        //         1. First 16 bytes is the IV for AES.
        //         2. Second 16 bytes is the key for AES.
        //         3. Final 32 bytes are used for the HMAC.
        const key = crypto.createHash('sha512').update(ecdhKey).digest()

        /* Set ciphertext. */
        const ciphertext = this._aesEncryptWithIV(
            key.slice(16, 32),
            key.slice(0, 16),
            Buffer.from(_plaintextMessage, 'utf8')
        )

        /* Set encrypted. */
        // NOTE: We send the public key, for our ephemeral private key,
        //       as an unencrypted buffer, as part of the prefix to our
        //       encrypted package. This allows ONLY the `pubkey` holder to
        //       decrypt our (ciphertext) message.
        const encrypted = Buffer.concat([
            Buffer.from('BIE1'),
            ephemeral.publicKey.toBuffer(),
            ciphertext
        ])

        /* Set MAC. */
        const mac = crypto
            .createHmac('sha256', key.slice(32))
            .update(encrypted)
            .digest()

        /* Return encrypted. */
        return Buffer.concat([encrypted, mac]).toString('base64')
    }

    /**
     * Decrypt
     *
     * Decrypts a text message for ONLY the receiver's private key.
     */
    static decrypt(_encryptedMessage, _wif) {
        /* Initialize private key. */
        const privateKey = new PrivateKey(_wif)

        /* Initialize encrypted (message). */
        const encrypted = Buffer.from(_encryptedMessage, 'base64')

        /* Valiate encrypted (message). */
        if (encrypted.length < 85) {
            throw new Error('invalid ciphertext: length')
        }

        /* Set magic (bytes). */
        const magic = encrypted.slice(0, 4)

        /* Initialize ephemeral public key. */
        let ephemeralPubkey = encrypted.slice(4, 37)

        /* Set ciphertext. */
        const ciphertext = encrypted.slice(37, -32)

        /* Set MAC. */
        const mac = encrypted.slice(-32)

        /* Validate magic (bytes). */
        if (magic.toString() !== 'BIE1') {
            throw new Error('invalid ciphertext: invalid magic bytes')
        }

        try {
            /* Set ephemeral public key. */
            ephemeralPubkey = PublicKey(ephemeralPubkey)
        } catch (error) {
            throw new Error('invalid ciphertext: invalid ephemeral pubkey')
        }

        // ???
        ephemeralPubkey.point.validate()

        /* Set secret multiplier. */
        const secretMultiplier = privateKey.toBigNumber()

        /* Set ECDH key. */
        const ecdhKey = PublicKey(
            ephemeralPubkey.point.mul(secretMultiplier)).toBuffer()

        /* Set key. */
        const key = crypto.createHash('sha512').update(ecdhKey).digest()

        /* Set initialization vector. */
        const iv = key.slice(0, 16)

        /* Set key (E). */
        const keyE = key.slice(16, 32)

        /* Set key (M). */
        const keyM = key.slice(32)

        /* Calculate the "valid" MAC. */
        const validMac = crypto
            .createHmac('sha256', keyM)
            .update(encrypted.slice(0, -32))
            // .update(encrypted.slice(-32)) // THIS SHOULD WORK AS WELL
            .digest('hex')

        /* Validate MAC. */
        if (mac.toString('hex') !== validMac) {
            throw new Error('invalid password')
        }

        /* Return decrypted string. */
        return this._aesDecryptWithIV(keyE, iv, ciphertext)
    }

    /**
     * Generate Keypair
     *
     * FIXME: DRY this up, using `rebuildKeypair`.
     */
    static generateKeypair() {
        /* Initialize keypair. */
        const keypair = {
            privateKey: new PrivateKey()
        }

        /* Set public key. */
        keypair.publicKey = keypair.privateKey.toPublicKey()

        /* Set public key (hex). */
        keypair.publicKeyHex = keypair.publicKey.toString('hex')

        /* Set private key (hex). */
        keypair.privateKeyHex = keypair.privateKey.toString('hex')

        /* Return keypair. */
        return keypair
    }

    /**
     * Rebuild Keypair
     *
     * TODO: Update `generateKeypair` for param and REMOVE THIS FUNCTION,
     *       as it's never used in the codebase.
     */
    static rebuildKeypair(somePrivateKey) {
        /* Initialize keypair. */
        const keypair = {
            privateKey: new PrivateKey(somePrivateKey)
        }

        /* Set public key. */
        keypair.publicKey = keypair.privateKey.toPublicKey()

        /* Set public key (hex). */
        keypair.publicKeyHex = keypair.publicKey.toString('hex')

        /* Set private key (hex). */
        keypair.privateKeyHex = keypair.privateKey.toString('hex')

        /* Return keypair. */
        return keypair
    }

    /**
     * AES Encrypt with IV
     */
    static _aesEncryptWithIV(key, iv, message) {
        let cipher, crypted
        cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
        cipher.setAutoPadding(true)
        crypted = cipher.update(message, 'hex', 'hex')
        crypted += cipher.final('hex')

        return Buffer.from(crypted, 'hex')
    }

    /**
     * AES Decrypt with IV
     */
    static _aesDecryptWithIV(key, iv, message) {
        let cipher, crypted
        cipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
        cipher.setAutoPadding(true)
        crypted = cipher.update(message, 'hex', 'hex')
        crypted += cipher.final('hex')

        return Buffer.from(crypted, 'hex')
    }

    /**
     * Get Keypair from WIF
     */
    static getKeypairFromWif(_wif) {
        /* Initialize coin. */
        const coin = {}

        /* Set private key. */
        coin.privateKey = new PrivateKey(_wif)

        /* Set public key. */
        coin.publicKey = coin.privateKey.toPublicKey()

        /* Set cash address. */
        coin.cashAddress = coin.publicKey.toAddress().toString()

        /* Return coin. */
        return coin
    }

}

/* Export module. */
module.exports = Encryption
