/* Import modules. */
const Nito = require('..')

;(async () => {
    // const someTxid = '06f83c7b3a89fda0b508e018321e9f2575f4b2708a67365e27cb2fee136f22e3'
    // const txData = await Nito.Transaction.getRawTransaction(someTxid, true)
    // console.log('\n\nTX DATA', txData)
    //
    // const outputs = txData.outputs
    // const coinInQuestion = outputs[Number(1)]
    //
    // const script = coinInQuestion.script
    // console.log('SCRIPT', script);
    // const address = Nito.Address.toCashAddress(script)
    // console.log('CASH ADDRESS', address)
    //
    // const utxoData = await Nito.Address
    //     .utxo(address, true)
    // console.log('\n\nUTXO DATA', utxoData)
    // console.log('\n\nUTXOS', utxoData.utxos)

    // const addresses = ['1LRjp5pUWmeUrRNm3dPvxE4kPwBa28LaWk','1EVMjW2ZPeuQenWFmfR4xkDE2VUZVGQT7F','1EtD7egVhLRQYHMzU27MH9yDREsMykZiKN','1LJStTSDeGrpCvEjA5eCkiHCgNvcJA6C3M','1JKeq9zWsCZLry48BPRMdngovTF6AWqqnZ']
    const addresses = ['1EVMjW2ZPeuQenWFmfR4xkDE2VUZVGQT7F']
    const address = '1EVMjW2ZPeuQenWFmfR4xkDE2VUZVGQT7F'
    const result = await Nito.Address.utxo(address, true)
    console.log('RESULT', result)
})()
