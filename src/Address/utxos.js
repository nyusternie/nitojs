/* Import modules. */
const Address = require('.')
const debug = require('debug')('nitojs:address:utxo')

/**
 * Unspent Transaction Outputs
 *
 * Compatibility adds properties to support additional data formats.
 * eg. BITBOX
 */
const utxos = async (_addresses, _compatibility = false) => {
    /* Initialize addresses. */
    let addresses = null

    /* Validate array. */
    if (Array.isArray(_addresses)) {
        addresses = _addresses
    } else {
        addresses = [_addresses]
    }
    debug('Requesting UTXOs for address(es):', addresses)

    /* Initialize Insomnia. */
    const Insomnia = require('../Blockchain/Insomnia')

    /* Initialize UTXOs. */
    let utxoData = []

    return new Promise(function (resolve, reject) {
        /* Initialize (completion) index. */
        let index = 0

        // NOTE: We run in parallel for performance gain.
        addresses.forEach(async (_address) => {
            /* Set address. */
            _address = Address.toCashAddress(_address)

            /* Request UTXOs. */
            let utxos = await Insomnia.utxos(_address)
                .catch(reject)

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

                /* Set legacy address. */
                const legacyAddress = Address.toLegacyAddress(_address)

                /* Set cash address. */
                const cashAddress = Address.toCashAddress(_address)

                /* Set public script hash. */
                const scriptPubKey = Address.toPubKeyHash(_address)

                /* Map additional properties (for compatiblity). */
                const compPkg = {
                    utxos,
                    legacyAddress,
                    cashAddress,
                    scriptPubKey,
                }

                /* Add compatiblity package to UTXO data. */
                utxoData.push(compPkg)
            } else {
                /* Add compatiblity package to UTXO data. */
                utxoData.push(utxos)
            }

            /* Check for completion. */
            if (++index === addresses.length) {
                /* Verify need to sort results. */
                if (addresses.length > 1) {
                    /* Initialize sorted data. */
                    const sortedData = []

                    /* Sort to requested order. */
                    for (let i = 0; i < addresses.length; i++) {
                        sortedData.push(
                            utxoData.find(
                                utxo => utxo.cashAddress === Address
                                    .toCashAddress(addresses[i])
                            )
                        )
                    }

                    /* Resolve sorted (array) data. */
                    resolve(sortedData)
                } else {
                    /* Validate response format. */
                    if (Array.isArray(_addresses)) {
                        /* Resolve (array) data. */
                        resolve(utxoData)
                    } else {
                        /* Resolve (object) data. */
                        resolve(utxoData[0])
                    }
                }

            }
        })
    })
}

/* Export module. */
module.exports = utxos
