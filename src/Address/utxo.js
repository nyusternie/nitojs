/* Import modules. */
const debug = require('debug')('nitojs:address:utxo')

/**
 * Unspent Transaction Outputs
 *
 * Compatibility adds properties to support additional data formats.
 * eg. BITBOX
 */
const utxo = async (_address, _compatibility = false) => {
    debug('Requesting UTXOs for address:', _address)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Request UTXOs. */
    let utxos = await Insomnia.utxos(_address)

    /* Validate compatiblity. */
    if (_compatibility) {
        /* Map additional UTXO aliases & formats. */
        utxos = utxos.map(utxo => {
            return {
                ...utxo,
                txid: utxo.tx_hash,
                vout: utxo.tx_pos,
                satoshis: utxo.value,
                amount: parseFloat(utxo.value / 100000000),
            }
        })

        /* Import Address class. */
        const Address = require('.')

        /* Map additional address properties. */
        utxos = {
            utxos: [ utxos ],
            legacyAddress: Address.toLegacyAddress(_address),
            cashAddress: Address.toCashAddress(_address),
            scriptPubKey: Address.toPubKeyHash(_address),
        }
    }

    /* Return UTXOs. */
    return utxos
}

/* Export module. */
module.exports = utxo
