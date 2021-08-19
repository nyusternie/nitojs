// if (window._bitcoinWalletApi) {
//     /* Set command. */
//     const command = 'sendAssets'
//
//     /* Set message id. */
//     const messageId = command + (Date.now() + Math.random()).toString()
//
//     /* Set data. */
//     const data = {
//         to: this.getAddress('causes'),
//         protocol: 'BCH',
//         value: parseFloat(this.donationAmount / 100000000.0).toString(),
//     }
//
//     /* Build message. */
//     const message = {
//         messageId,
//         command,
//         data,
        // websiteMetadata: {
        //     title: `New Contribution`,
        //     description: `Please Note: Unless this campaign reaches its goal, your funds will never leave your wallet; and you can cancel your pledge at anytime.`,
        // },
//     }
//
//     /* Call wallet api. */
//     window._bitcoinWalletApi.messageHandler(JSON.stringify(message))
//
// } else {
//     try {
//         const web4bch = new window.Web4Bch(window.web4bch.currentProvider)
//         console.log('web4bch-2', web4bch)
//
//         const to = this.getAddress('causes')
//         const value = this.donationAmount / 100000000.0
//         const txParams = {
//             to,
//             from: web4bch.bch.defaultAccount,
//         }
//         txParams.value = this.donationAmount.toString()
//         console.log('MATCH VALUES', value, txParams.value)
//
//         web4bch.bch.sendTransaction(txParams, (err, txid) => {
//             if (err) {
//                 if (err.message.includes('User denied transaction signature')) {
//                     // TODO: Add a special user message for this error type
//                     Swal.close()
//
//                     return console.error('DENIED:', err)
//                 }
//
//
//                 /* Close any open alerts. */
//                 Swal.close()
//
//                 return console.error('ERROR:', err)
//             } else {
//                 console.log('TXID', txid)
//             }
//         })
//
//     } catch (err) {
//         console.error(err)
//     }
//
// }
