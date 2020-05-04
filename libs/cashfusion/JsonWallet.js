/* Import core modules. */
const _ = require('lodash')
const debug = require('debug')('cashshuffle:wallet')
const fs = require('fs')
const qrcode = require('qrcode-terminal')

/* Import BITBOX. */
const BITBOX = require('bitbox-sdk').BITBOX

// FOR DEVELOPMENT PURPOSES ONLY
const LIVE = false

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const currentPath = __filename.substring(0, __filename.lastIndexOf('/'))
process.chdir(currentPath)

/**
 * JSON Wallet Address
 */
class JsonWalletAddress {
    constructor (options) {
        return _.extend(this, options)
    }

    fund () {
        debug(`Add funds to\n\t${this.cashAddress}\n\t( ${this.legacyAddress})\n`)
        return qrcode.generate(this.cashAddress, { small: true })
    }

    sweep () {
        debug(`Sweeping funds for\n\t${this.cashAddress}\n\t( ${this.legacyAddress})\n`)
        return qrcode.generate(this.privateKeyWif, { small: true })
    }
}

/**
 * JSON Wallet
 */
class JsonWallet {
    constructor (options) {
        this.walletData = {
            name: 'test_json_wallet',
            file: options.file,
            created: new Date().getTime(),
            lastUpdated: new Date().getTime(),
            derivationTemplate: `m/44'/145'/z'/y/x`,
            addresses: []
        }

        // this.masterHDNode

        /* Initialize BITBOX. */
        this.bitbox = new BITBOX()

        /* Initialize websocket. */
        this.socket = new this.bitbox.Socket({
            callback: () => {
                debug('Websockets connection to Bitcoin.com established!')
            },
            wsURL: 'wss://ws.bitcoin.com'
        })

        if (LIVE) {
            /* Listen for transactions. */
            this.socket.listen('transactions', (data) => {
                try {
                    /* Parse JSON data. */
                    data = JSON.parse(data)
                } catch (err) {
                    throw new Error('Transaction Parsing error')
                }

                debug('TX DATA (outputs)', data)

                const outputAddresses = []

                data.outputs.forEach(output => {
                    if (output.scriptPubKey.addresses.length) {
                        outputAddresses.push(output.scriptPubKey.addresses[0])
                    }
                })

                /* Determine transaction affect. */
                const affected = _.intersection(
                    _.map(this.walletData.addresses, 'legacyAddress'), outputAddresses
                )

                /* Validate transaction affect. */
                if (affected.length) {
                    debug(`\t You got new money in ${affected})\n`)

                    /* Wait a bit. */
                    // await delay(1000)

                    /* Update addresses. */
                    this.updateAddresses()
                }
            })
        }

        if (options.file) {
            /* Initialize wallet flag. */
            let createNewWallet = false

            /* Initialize wallet data. */
            let walletData

            try {
                walletData = require(options.file)

                /* Validate wallet seed words. */
                if (!walletData.words) {
                    /* Set creation flag. */
                    createNewWallet = true
                }
            } catch (nope) {
                debug(`\tNo wallet found. \n\tCreating a fresh one at ${this.currentPath}/test_json_wallet`)

                /* Set creation flag. */
                createNewWallet = true
            }

            /* Validate wallet. */
            if (createNewWallet) {
                // create 256 bit BIP39 mnemonic
                this.walletData.words = this.bitbox.Mnemonic.generate(
                    128,
                    this.bitbox.Mnemonic.wordLists()['english']
                )
            } else {
                _.extend(this.walletData, walletData)
            }

            this.masterHDNode = this.bitbox.HDNode
                .fromSeed(this.bitbox.Mnemonic.toEntropy(this.walletData.words))

            debug('test_json_wallet json wallet is loaded and ready to use')

            /* Set last updated. */
            this.walletData.lastUpdated = new Date().getTime()

            /* Save wallet. */
            this.save()

            /* Return this. */
            return this
        } else {
            throw new Error('No wallet file found.')
        }
    }

    /**
     * Get (Wallet) Addresses
     */
    get addresses () {
        return this.walletData.addresses
            .map((oneAddress) => {
                return new JsonWalletAddress(_.cloneDeep(oneAddress))
            })
    }

    /**
     * Get Unshuffled Coins
     *
     * Return a deep-cloned array of all the unshuffled coins
     * that reside in every address in our wallet that isn't
     * under the derivation path this wallet reserves strictly
     * for shuffled coins.
     *
     * Nito Cash (NC) is represented by the ascii decimal value (7867):
     * eg. m/44'/145'/0/7867/<index>
     */
    get unshuffledCoins () {
        const unshuffled = _.filter(this.walletData.addresses, (oneAddress) => {
            return oneAddress.y !== 7867 && oneAddress.balanceSatoshis
        })

        const unshuffledCoins = _.map(unshuffled, function (oneAddress) {
            return _.map(oneAddress.coins, function (oneCoin) {
                oneCoin.frozen = oneAddress.frozen
                return oneCoin
            })
        })

        return _.cloneDeep(
            _.orderBy(
                _.compact(
                    _.flatten(unshuffledCoins)
                ), ['amountSatoshis'], ['desc']
            )
        )
    }

    /**
     * Get Shuffled Coins
     */
    get shuffledCoins () {
        /* Set shuffled (addresses). */
        const shuffled = _.filter(this.walletData.addresses, (oneAddress) => {
            return oneAddress.y === 7867 && oneAddress.balanceSatoshis
        })

        /* Set shuffled coins. */
        const shuffledCoins = _.map(shuffled, function (oneAddress) {
            return _.map(oneAddress.coins, function (oneCoin) {
                oneCoin.frozen = oneAddress.frozen

                return oneCoin
            })
        })

        /* Return shuffled coins. */
        return _.cloneDeep(
            _.orderBy(
                _.compact(
                    _.flatten(shuffledCoins)
                ), ['amountSatoshis'], ['desc']
            )
        )
    }

    /**
     * Get Coins
     */
    get coins () {
        /* Set all addresses. */
        const all = _.filter(this.walletData.addresses, (oneAddress) => {
            return oneAddress.balanceSatoshis
        })

        /* Set all coins. */
        const coins = _.map(all, function (oneAddress) {
            return _.map(oneAddress.coins, function (oneCoin) {
                oneCoin.frozen = oneAddress.frozen
                return oneCoin
            })
        })

        /* Return coins. */
        return _.cloneDeep(
            _.orderBy(
                _.compact(
                    _.flatten(coins)
                ), ['amountSatoshis'], ['desc']
            )
        )
    }

    /**
     * Get Fresh (Address)
     */
    get fresh () {
        return {
            change: this.freshAddressFromY.bind(this, 0, true),
            deposit: this.freshAddressFromY.bind(this, 0, false, true),
            shuffle: this.freshAddressFromY.bind(this, 7867, true)
        }
    }

    /**
     * Fresh Address from Y
     *
     * NOTE: `Y` is the "change" level of BIP-44.
     */
    freshAddressFromY (yPathVal, freezeAddressOnReturn, returnJsonAddressInstance) {
        /* Set freeze address flag. */
        freezeAddressOnReturn = freezeAddressOnReturn || false

        /* Set address query. */
        const addressQuery = {
            y: Number(yPathVal),
            used: false,
            frozen: false
        }

        /* Set unused address. */
        const unusedAddress = _.find(this.walletData.addresses, addressQuery)

        /* Set largest shuffled. */
        const largestShuffled = _.maxBy(_.filter(this.walletData.addresses, {
            y: Number(yPathVal)
        }), 'x')

        /* Set x value. */
        // NOTE: `x` is the "address_index" of BIP-44.
        const useX = largestShuffled ? largestShuffled.x + 1 : 0

        /* Initialize address to return. */
        let addressToReturn

        /* Validate unused address. */
        if (unusedAddress) {
            addressToReturn = _.extend(unusedAddress, {
                frozen: freezeAddressOnReturn
            })

            /* Save wallet. */
            this.save()
        } else {
            addressToReturn = this.newAddress(
                `m/44'/145'/0'/${yPathVal}/${useX}`,
                undefined,
                { frozen: freezeAddressOnReturn }
            )
        }

        return returnJsonAddressInstance ? new JsonWalletAddress(
            _.cloneDeep(addressToReturn)
        ) : _.cloneDeep(addressToReturn)
    }

    /**
     * Freeze Addresses
     */
    freezeAddresses (oneOrMoreAddresses) {
        oneOrMoreAddresses = _.isArray(oneOrMoreAddresses) ? oneOrMoreAddresses : [oneOrMoreAddresses]

        /* Initialize results. */
        const results = {
            success: [],
            fail: []
        }

        _.each(oneOrMoreAddresses, (oneAddress) => {
            /* Set frozen address. */
            const frozenAddress = _.find(this.walletData.addresses, {
                cashAddress: this.bitbox.Address.toCashAddress(oneAddress)
            })

            /* Validate frozen address. */
            if (!frozenAddress) {
                results.fail.push(oneAddress)
            } else {
                // ???
                const updatedAddress = _.extend(frozenAddress, { frozen: true })
                debug('updatedAddress', updatedAddress)

                results.success.push(oneAddress)
            }
        })

        /* Save wallet. */
        this.save()

        /* Return results. */
        return results
    }

    /**
     * Unfreeze Addresses
     */
    unfreezeAddresses (oneOrMoreAddresses) {
        oneOrMoreAddresses = _.isArray(oneOrMoreAddresses) ? oneOrMoreAddresses : [oneOrMoreAddresses]

        /* Initialize results. */
        const results = {
            success: [],
            fail: []
        }

        _.each(oneOrMoreAddresses, (oneAddress) => {
            /* Set frozen address. */
            const frozenAddress = _.find(this.walletData.addresses, {
                cashAddress: this.bitbox.Address.toCashAddress(oneAddress)
            })

            /* Validate frozen address. */
            if (!frozenAddress) {
                results.fail.push(oneAddress)
            } else {
                // ???
                const updatedAddress = _.extend(frozenAddress, { frozen: false })
                debug('updatedAddress', updatedAddress)

                results.success.push(oneAddress)
            }
        })

        /* Save wallet. */
        this.save()

        /* Return results. */
        return results
    }

    /**
     * Save (Wallet File)
     */
    save () {
        /* Set wallet data. */
        const walletData = JSON.stringify(this.walletData, null, 4)

        // TODO: Abstract this into a generic "wallet persistence" mechanism
        fs.writeFileSync(this.walletData.file, 'module.exports = ' + walletData)
    }

    /**
     * New Address
     */
    newAddress (derivationPath, useTemplatePath, addressMeta) {
        useTemplatePath = useTemplatePath ? useTemplatePath.toLowerCase() : undefined

        if (useTemplatePath && ['x', 'y', 'z'].indexOf(useTemplatePath) === -1) {
            /* eslint-disable-next-line no-console */
            console.error(`Incorrect wallet path!  Must use 'x', 'y', or 'z'`)

            throw new Error('Bad derivation path.')
        }

        /**
         * Make Address
         */
        const _makeAddress = (query) => {
            /* Initialize parameters. */
            const x = Number(query.x)
            const y = query.y ? Number(query.y) : 0
            const z = query.z ? Number(query.z) : 0

            /* Set derivation (path) string. */
            const addressDerivationString = `m/44'/145'/${z}'/${y}/${x}`

            /* Set child node. */
            const childNode = this.masterHDNode.derivePath(addressDerivationString)

            /* Set address data. */
            const addressData = {
                x,
                y,
                z,
                derivationString: addressDerivationString,
                cashAddress: this.bitbox.HDNode.toCashAddress(childNode),
                legacyAddress: this.bitbox.HDNode.toLegacyAddress(childNode),
                privateKeyWif: this.bitbox.HDNode.toWIF(childNode),
                coins: []
            }

            // NOTE: If additional properties were given, add this to this
            //       address before we save it.
            if (addressMeta) {
                _.extend(addressData, addressMeta)
            }

            /* Add address data to wallet data. */
            this.walletData.addresses.push(addressData)

            /* Save wallet. */
            this.save()

            /* Return address data. */
            return addressData
        }

        if (!derivationPath && !useTemplatePath) {
            if (!this.walletData.addresses.length) {
                return _makeAddress({ x: 0 })
            } else {
                useTemplatePath = 'x'
            }
        }

        /* Validate derivation path. */
        if (derivationPath) {
            /* Set split path. */
            const splitPath = derivationPath.split('/')

            /* Return new address. */
            return _makeAddress({
                x: Number(splitPath[5].replace(/(\D)/ig, '')),
                y: Number(splitPath[4].replace(/(\D)/ig, '')),
                z: Number(splitPath[3].replace(/(\D)/ig, ''))
            })
        } else {
            /* Initialize query. */
            const query = {}

            /* Set largest (index). */
            const largest = _.maxBy(this.walletData.addresses, useTemplatePath)

            /* Set query. */
            query[useTemplatePath] = largest[useTemplatePath] + 1

            /* Return new address. */
            return _makeAddress(query)
        }
    }

    /**
     * Update Addresses
     *
     * NOTE: Connects to remote blockchain API(s).
     */
    async updateAddresses (updateAllAddresses) {
        /* Set update frequency. */
        // NOTE: If an address has been used and contains no coins,
        //       only update it once every 30 minutes
        const updateDeadFrequency = 1000 * 60 * 30

        /* Set maximum addresses per call. */
        const maxAddressesPerCall = 15

        /* Set filtered addresses. */
        const filteredAddresses = _.reduce(
            this.walletData.addresses, function (keepers, oneAddress) {
                /* Set dead address flag. */
                const addressIsDead = oneAddress.balanceSatoshis <= 0 && oneAddress.used

                /* Set address update flag. */
                const deadAddressNeedsUpdating = new Date().getTime() >= oneAddress.lastUpdated + updateDeadFrequency

                /* Validate update flag. */
                if (updateAllAddresses || !addressIsDead) {
                    keepers.push(oneAddress)
                } else {
                    if (deadAddressNeedsUpdating) {
                        keepers.push(oneAddress)
                    }
                }

                /* Return keepers. */
                return keepers
            }, [])

        /* Set update address. */
        const addressesToUpdate = _.map(filteredAddresses, 'cashAddress')

        /* Initialize UTXO info. */
        // NOTE: Will get all the utxos for each address in our wallet.
        const utxoInfo = []

        /* Loop through addresses for update. */
        while (addressesToUpdate.length) {
            /* Set applicable address. */
            const grabThese = addressesToUpdate
                .splice(addressesToUpdate, maxAddressesPerCall)

            /* Initialize applicable UTXOs. */
            let someUtxos

            try {
                /* Retrieve UTXOs. */
                someUtxos = await this.bitbox.Address.utxo(grabThese)

                /* Add to UTXO info. */
                _.each(someUtxos, (oneThing) => { utxoInfo.push(oneThing) })
            } catch (nope) {
                debug(`UTXO Fetch Error: That didn't work! ${nope.response.status}: ${nope.response.statusText}\n\n`)
                continue
            }

            /* Delay execution. */
            if (addressesToUpdate.length) {
                await delay(750)
            }
        }

        /* Set ALL address. */
        const allCashAddresses = _.map(filteredAddresses, 'cashAddress')

        /* Initialize ALL address details. */
        const allAddressDetails = []

        /* Loop through ALL addresses. */
        while (allCashAddresses.length) {
            /* Initialize address details. */
            let someDetails

            try {
                /* Retrieve ALL address details. */
                someDetails = await this.bitbox.Address
                    .details(allCashAddresses.splice(allCashAddresses, maxAddressesPerCall))

                /* Add details to ALL address details. */
                _.each(someDetails, (oneThing) => { allAddressDetails.push(oneThing) })
            } catch (nope) {
                debug(`Couldn't fetch some address details: ${nope.message}`)
                continue
            }

            /* Delay execution. */
            if (allCashAddresses.length) {
                await delay(750)
            }
        }

        /* Loop through ALL addresses. */
        for (let oneAddressObject of this.walletData.addresses) {
            /* Set filtered address. */
            const filteredAddress = _.find(filteredAddresses, {
                cashAddress: oneAddressObject.cashAddress
            })

            /* Validate filtered address. */
            if (!filteredAddress) {
                continue
            }

            /* Set address details. */
            const addressDetails = _.find(allAddressDetails, {
                cashAddress: oneAddressObject.cashAddress
            })

            /* Set UTXO info. */
            const addressUtxoInfo = _.find(utxoInfo, {
                cashAddress: oneAddressObject.cashAddress
            })

            /* Set coins in address. */
            const coinsInAddress = _.reduce(addressUtxoInfo.utxos, (coins, oneUtxo) => {
                /* Add UTXO info to coins. */
                coins.push({
                    txid: oneUtxo.txid,
                    vout: oneUtxo.vout,
                    height: oneUtxo.height,
                    confirmations: oneUtxo.confirmations,
                    amountSatoshis: oneUtxo.satoshis,
                    legacyAddress: addressUtxoInfo.legacyAddress,
                    cashAddress: addressUtxoInfo.cashAddress,
                    scriptPubKey: addressUtxoInfo.scriptPubKey,
                    privateKeyWif: oneAddressObject.privateKeyWif,
                    lastUpdated: new Date().getTime()
                })

                /* Return coins. */
                return coins
            }, [])

            /* Merge address data. */
            _.extend(oneAddressObject, {
                frozen: oneAddressObject.frozen ? oneAddressObject.frozen : false,
                legacyAddress: oneAddressObject.legacyAddress,
                cashAddress: oneAddressObject.cashAddress,
                balanceSatoshis: _.sumBy(coinsInAddress, 'amountSatoshis'),
                used: addressDetails.txApperances ? addressDetails.txApperances : false,
                coins: coinsInAddress,
                lastUpdated: new Date().getTime()
            })
        }

        /* Save wallet. */
        this.save()

        /* Set statistics. */
        const stats = _.reduce(this.walletData.addresses, function (stats, oneAddress) {
            stats.addresses++
            stats.balance += _.sumBy(oneAddress.coins, 'amountSatoshis')
            stats.coins += oneAddress.coins.length
            stats.shuffledCoins += oneAddress.y === 7867 ? oneAddress.coins.length : 0
            stats.shuffledBalance += oneAddress.y === 7867 ? _.sumBy(oneAddress.coins, 'amountSatoshis') : 0
            stats.activeAddresses += oneAddress.balanceSatoshis || !oneAddress.used ? 1 : 0

            /* Return stats. */
            return stats
        }, {
            addresses: 0,
            activeAddresses: 0,
            balance: 0,
            coins: 0,
            shuffledCoins: 0,
            shuffledBalance: 0
        })

        /* Set (total) balance. */
        stats.balance = '~' + (
            Number(
                Math.floor(
                    this.bitbox.BitcoinCash.satsToBits(stats.balance)
                )
            ).toLocaleString()
        ) + ' bits'

        /* Set shuffled balance. */
        stats.shuffledBalance = '~' + (
            Number(
                Math.floor(
                    this.bitbox.BitcoinCash.satsToBits(stats.shuffledBalance)
                )
            ).toLocaleString()
        ) + ' bits'

        debug(`  Your Current Wallet Statistics`)
        debug(`  ------------------------------`)

        /* Loop through ALL properties. */
        for (let oneProp in stats) {
            debug('\t', oneProp, ':', stats[oneProp])
        }

        return this
    }
}

module.exports = JsonWallet
