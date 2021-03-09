/* Import components. */
// const Blockchain = '../Blockchain'

/**
 * Update Coin
 *
 * Updates the status of a coin in its respective session.
 */
// const _updateCoin = (_coin) => {
//     console.info('Updating coin...', _coin) // eslint-disable-line no-console
//
//     /* Request coins. */
//     const coins = this._coins
//     console.log('UPDATE COIN (coins):', coins)
//
//     /* Validate coins. */
//     if (!coins) {
//         return
//     }
//
//     /* Add coin to session. */
//     coins[`${_coin.txid}:${_coin.vout}`] = _coin
//
//     /* Update coins. */
//     this._coins = coins
//     // commit('setCoins', coins)
// }

/**
 * Update Status
 *
 * Will mark "spent" coins as disabled.
 */
// const _updateStatus = (_coins) => {
//     Object.keys(_coins).forEach(async coinid => {
//         /* Set txid. */
//         const txid = coinid.split(':')[0]
//
//         /* Set vout. */
//         const vout = coinid.split(':')[1]
//
//         /* Query spent status. */
//         const isSpent = await Blockchain.Query.isSpent(txid, vout)
//
//         /* Validate spent. */
//         if (isSpent) {
//             /* Set coin. */
//             const coin = _coins[coinid]
//
//             /* Validate status. */
//             if (coin && coin.status !== 'disabled') {
//                 /* Set status. */
//                 coin.status = 'disabled'
//
//                 /* Request coin update. */
//                 _updateCoin(coin)
//             }
//         }
//     })
// }

/**
 * Update Coins
 *
 * NOTE: Requires the data package received from BitDB.
 */
const updateCoins = async function (_data) {
    console.log('\nUPDATE COINS (data):', _data)
    const util = require('util')

    /* Set coins. */
    const coins = this._coins
    console.log('\nUPDATE COINS (coins):', coins)

    /* Validate coins. */
    if (!coins) {
        // return
    }

    /* Handle data. */
    for (let i = 0; i < _data.length; i++) {
        /* Set transaction. */
        const tx = _data[i]

        /* Set transaction id. */
        const txid = tx.tx.h
        console.log('\nTXID', txid)

        /* Set inputs. */
        const inputs = tx.in
        console.log('\nINPUTS', util.inspect(inputs, false, null, true))

        /* Set outputs. */
        const outputs = tx.out
        console.log('\nOUTPUTS', util.inspect(outputs, false, null, true))

        /* Handle inputs. */
        inputs.forEach(_input => {
            console.log('\nINPUT', util.inspect(_input, false, null, true))

            /* Set address. */
            const address = _input.e.a
            console.log('\nADDRESS', address)

            /* Set index. */
            const index = _input.e.a
            console.log('\nINDEX', index)

            const outpoint = `${txid}:${index}`
            console.log('\nOUTPOINT', outpoint)

        })

        /* Handle outputs. */
        outputs.forEach(_output => {
            console.log('\nOUTPUT', util.inspect(_output, false, null, true))

            /* Set address. */
            const address = _output.e.a
            console.log('\nADDRESS', address)

            /* Set index. */
            const index = _output.e.a
            console.log('\nINDEX', index)

            /* Set value. */
            const value = _output.e.v
            console.log('\nINDEX', value)

            const outpoint = `${txid}:${index}`
            console.log('\nOUTPOINT', outpoint)
        })

        /* Set */
        await this._mutex.runExclusive(async () => {
            console.log('RUNNING MUTEX')
            // _updateCoin()
        })
        // this._mutex
        //     .runExclusive(function() {
        //         console.log('RUNNING MUTEX')
        //     })
        //     .then(function(result) {
        //         console.log('MUTEX RESULT', result)
        //     })

    }

}

/* Export module. */
module.exports = updateCoins

/*

BitDB Data Package Example

{
  type: 'mempool',
  data: [
    {
      tx: {
        h: 'f3234770cbd599fe625e86e132902b59fbe4eb3c7ac113785b9a7fac780063d0'
      },
      in: [
        {
          i: 0,
          b0: 'MEQCIHZtXjGTOg6HmWhrHgV1qV/ojorvkuUQK+ri/HSE1h3jAiBApEf5wViMFtcRThHbZRlYIkn3W/Jmzv+fSaIe034bm0E=',
          b1: 'AhnxEaaBD1kIKMuwfG8sYY9vtbUy42G5zBVBV13b+4Qm',
          str: '30440220766d5e31933a0e8799686b1e0575a95fe88e8aef92e5102beae2fc7484d61de3022040a447f9c1588c16d7114e11db6519582249f75bf266ceff9f49a21ed37e1b9b41 0219f111a6810f590828cbb07c6f2c618f6fb5b532e361b9cc1541575ddbfb8426',
          e: {
            h: '2bd0f72631fbcaf6313c91bfb15acf44c8fa8c1f6644125d6bc33aba4c865d93',
            i: 0,
            a: 'qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk'
          },
          h0: '30440220766d5e31933a0e8799686b1e0575a95fe88e8aef92e5102beae2fc7484d61de3022040a447f9c1588c16d7114e11db6519582249f75bf266ceff9f49a21ed37e1b9b41',
          h1: '0219f111a6810f590828cbb07c6f2c618f6fb5b532e361b9cc1541575ddbfb8426'
        }
      ],
      out: [
        {
          i: 0,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: 'hljcUf8Jnnut3eIVVnT/CU+qJG8=',
          s2: '�X�Q�\t�{���\x15Vt�\tO�$o',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 8658dc51ff099e7baddde2155674ff094faa246f OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 15382,
            i: 0,
            a: 'qzr93hz3luyeu7admh3p24n5luy5l23yduqsr0s0ly'
          },
          h2: '8658dc51ff099e7baddde2155674ff094faa246f'
        },
        {
          i: 1,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: '6YZQ2cqi5pDz5Nt1nUzWo+yv4I8=',
          s2: '�P�ʢ����u�L֣���',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 e98650d9caa2e690f3e4db759d4cd6a3ecafe08f OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 41459,
            i: 1,
            a: 'qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk'
          },
          h2: 'e98650d9caa2e690f3e4db759d4cd6a3ecafe08f'
        }
      ],
      _id: '604695a2f0a94a1cfa59c477'
    }
  ]
}

*/
