/* Initialize BITBOX. */
import { BITBOX } from 'bitbox-sdk'

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/**
 * Update Inputs
 */
const updateInputs = ({ commit, getters }, _params) => {
    console.info('Updating inputs...', _params)

    /* Set purse. */
    const purse = _params.purse
    console.log('PURSE', purse)

    /* Set (input) action. */
    const inputAction = _params.action
    console.log('INPUT ACTION', inputAction)

    /* Set (input) address. */
    const inputAddress = _params.address
    console.log('INPUT ADDRESS', inputAddress)

    /* Retreive coins. */
    const coins = getters.getAccounts
    console.log('ALL COINS', coins)

    /* Retrieve purse coins. */
    const purseAccounts = getters.getAccountsByWallet(purse)
    console.log('PURSE COINS', purseAccounts)

    /* Filter "active" coins. */
    Object.keys(purseAccounts).forEach(index => {
        if (purseAccounts[index].s === 'a') {
            // FIXME
            const change = 0

            /* Set (derivation) path. */
            const path = `${getters.getDerivationPath('BCH')}/${change}/${index}`
            console.log('ACTIVE COINS (path)', path)

            /* Initialize HD node. */
            const hdNode = getters.getHDNode

            /* Initialize child node. */
            const childNode = hdNode.derivePath(path)

            /* Set (active) address. */
            const activeAddress = bitbox.HDNode.toCashAddress(childNode)
            console.log('ACTIVE COINS (address)', activeAddress)

            /* Validate (matching) input address. */
            if (inputAddress === activeAddress) {
                /* Handle input update. */
                switch(inputAction) {
                case 'add':
                    // FIXME: Support handling of multiple UTXOs per account.
                    purseAccounts[index].u[0] = {
                        s: 'a',
                    }
                    break
                }
            }

        }
    })

    /* Update coins. */
    coins[purse] = purseAccounts

    /* Commit updated coins. */
    commit('setAccounts', coins)
}

/* Export module. */
export default updateInputs
