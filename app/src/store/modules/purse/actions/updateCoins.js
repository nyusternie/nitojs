/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Update Status
 */
const updateStatus = (_coins, dispatch) => {
    Object.keys(_coins).forEach(async coinId => {
        /* Set txid. */
        const txid = coinId.split(':')[0]
        console.log('UPDATE STATUS (txid)', txid)

        /* Set vout. */
        const vout = coinId.split(':')[1]
        console.log('UPDATE STATUS (vout)', vout)

        const txDetails = await bitbox.Transaction.details(txid)
        console.log('UPDATE STATUS (txDetails)', txDetails)

        if (txDetails.vout[vout].spentTxId !== null) {
            console.log('UPDATE STATUS AS SPENT FOR:', coinId)

            // FOR DEVELOPMENT ONLY
            const sessionId = 0

            const coin = _coins[coinId]

            coin.status = 'disabled'

            /* Create coin package. */
            const pkg = {
                sessionId,
                coin,
            }

            /* Add new coin. */
            dispatch('updateCoin', pkg)
        }
    })

}

/**
 * Update Coins (for ALL sessions)
 */
const updateCoins = async ({ dispatch, getters }) => {
    /* Set session id. */
    const sessionId = getters.getActiveSessionId
    // console.log('UPDATE COINS (sessionId)', sessionId)

    /* Validate session id. */
    if (sessionId === null) {
        return
    }

    /* Retrieve sessions. */
    const sessions = getters.getSessions
    console.log('UPDATE COINS (sessions)', sessions)

    /* Validate (active) session. */
    if (!sessions || !sessions[sessionId].coins) {
        return
    }

    /* Set coins. */
    const coins = sessions[sessionId].coins
    console.log('UPDATE COINS (coins)', coins)

    /* Update status. */
    updateStatus(coins, dispatch)

    /* Retrieve account. */
    const account = getters.getAccountBySessionId(sessionId)
    console.log('UPDATE COINS (account)', account)

    /* Validate account. */
    if (account === null) {
        return
    }

    /* Build search array. */
    const acctSearch = account.map(obj => {
        return obj.address
    })
    // console.log('UPDATE COINS (acctSearch)', acctSearch)

    /* Retrieve address details. */
    const searchDetails = await bitbox.Address.details(acctSearch)
    // console.log('UPDATE COINS (address details)', searchDetails)

    searchDetails.forEach(addrDetails => {
        const searchAddr = addrDetails.cashAddress
        // console.log('UPDATE COINS (searchAddr)', searchAddr)

        // const balanceSat = addrDetails.balanceSat
        // console.log('UPDATE COINS (addrDetails.balanceSat)', balanceSat)

        const txs = addrDetails.transactions
        // console.log('UPDATE COINS (addrDetails.txs)', txs)

        txs.forEach(async tx => {
            /* Retrieve transaction details. */
            const txDetails = await bitbox.Transaction.details(tx)
            // console.log('UPDATE COINS (tx details)', txDetails)

            /* Set outputs. */
            const outputs = txDetails.vout

            /* Handle all transaction outputs. */
            outputs.forEach((output, index) => {
                // console.log('UPDATE COINS (output)', output)

                /* Set satoshi (amount). */
                const satoshis = parseInt(output.value * 100000000)
                // console.log('UPDATE COINS (satoshis)', satoshis)

                /* Set script public key. */
                const scriptPubKey = output.scriptPubKey

                /* Validate script. */
                if (!scriptPubKey || !scriptPubKey.cashAddrs) {
                    return
                }

                /* Set addresses. */
                const cashAddrs = scriptPubKey.cashAddrs
                // console.log('UPDATE COINS (cashAddrs)', cashAddrs)

                /* Initialize WIF. */
                let chainId = null

                /* Initialize WIF. */
                let wif = null

                /* Find the WIF. */
                for (let i = 0; i < account.length; i++) {
                    if (account[i].address === searchAddr) {
                        /* Set chain id. */
                        chainId = account[i].chainId

                        /* Set WIF. */
                        wif = account[i].wif

                        break
                    }
                }

                /* Validate search address. */
                if (cashAddrs.includes(searchAddr)) {
                    /**
                     * Coin
                     *
                     * Status codes:
                     *     active: Coin is ready to receive OR spend funds.
                     *     disabled: Already received and spent funds (MUST be empty).
                     *     locked: Coin is reserved OR has received funds currently
                     *             being held in reserve for a later use.
                     *             (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
                     */
                    const coin = {
                        status: 'active',
                        txid: txDetails.txid,
                        vout: index,
                        satoshis,
                        amountSatoshis: satoshis, // DEPRECATED
                        wif,
                        privateKeyWif: wif, // DEPRECATED
                        cashAddress: searchAddr,
                        legacyAddress: bitbox.Address.toLegacyAddress(searchAddr),
                    }
                    // console.log('UPDATE COINS (coin)', coin)

                    const coins = getters.getCoinsBySessionId(sessionId)
                    // console.log('COINS', sessionId, coins)

                    /* Validate new coin. */
                    if (coins && !coins[`${coin.txid}:${coin.vout}`]) {
                        /* Create coin package. */
                        const pkg = {
                            sessionId,
                            chainId,
                            coin,
                        }

                        /* Add new coin. */
                        dispatch('addCoin', pkg)

                        try {
                            /* Initialize media. */
                            const media = new Audio(require('@/media/coins.wav'))

                            /* Play media. */
                            // WARNING: This action may fail on several browsers;
                            //          so it's best to do this last to avoid any
                            //          unforseen side-effects.
                            media.play()
                        } catch (err) {
                            console.error(err) // eslint-disable-line no-console
                        }
                    } else {
                        console.error('Coin already exists in the purse.')
                    }
                }
            })

        })

    })
}

/* Export module. */
export default updateCoins
