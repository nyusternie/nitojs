<template>
    <div class="row">
        <div class="col-12">
            <card :title="pools.title" :subTitle="pools.subTitle">
                <div slot="raw-content" class="table-responsive">
                    <paper-table
                        :data="pools.data"
                        :columns="pools.columns"
                    ></paper-table>
                </div>
            </card>
        </div>
     </div>
</template>

<script>
/* Import modules. */
import { BITBOX } from 'bitbox-sdk'
import numeral from 'numeral'
import superagent from 'superagent'

/* Import components. */
import { PaperTable } from '@/components'

export default {
    components: {
        PaperTable
    },
    data() {
        return {
            bitbox: null,
            usd: 0,

            pools: {
                title: 'CashShuffle Pool Statistics',
                subTitle: 'loading...',
                columns: [
                    'Pool Id',
                    'Minimum Satoshis',
                    'Minimum Fiat',
                    'Current Waiting Pool'
                ],
                data: [],
                connections: 0,
            }
        }
    },
    computed: {
        //
    },
    methods: {
        /**
         * Format Price
         */
        formatPrice: function (_satoshis) {
            /* Set value. */
            const value = (_satoshis / 10000000000) * this.usd

            /* Return formatted value. */
            return numeral(value).format('$0.00[00]')
        },

        /**
         * Initialize BITBOX
         */
        initBitbox() {
            console.info('Initializing BITBOX..')

            try {
                /* Initialize BITBOX. */
                this.bitbox = new BITBOX()
            } catch (err) {
                console.error(err)
            }
        },

        /**
         * Update Price
         */
        async updatePrice() {
            try {
                /* Request current price. */
                const current = await this.bitbox.Price.current('usd')
                // console.log('CURRENT PRICE', current)

                /* Set current price. */
                this.usd = current
            } catch (err) {
                console.error(err)
            }
        },
    },
    created: async function () {
        /* Initialize BITBOX. */
        this.initBitbox()

        /* Update USD. */
        await this.updatePrice()

        /* Set server URI. */
        const serverUri = 'https://shuffle.servo.cash:8080/stats'

        superagent
            .get(serverUri)
            .set('accept', 'json')
            .end(async (err, data) => {
                if (err) {
                    return console.error('API ERROR:', err)
                }

                console.log('API response:', data)

                /* Filter production pools. */
                const stats = data.body.pools.filter(pool => {
                    return pool.version === 300
                })

                /* Sort by pool tier (amount). */
                stats.sort((a, b) => {
                    return a.amount - b.amount
                })

                /* Set subtitle. */
                this.pools.subTitle = `Current pool: [ shuffle.servo.cash ] has [ ${data.body.connections} ] active connections`

                // console.log('Stats:', stats)

                stats.forEach((pool, index) => {
                    this.pools.data.push({
                        poolid: `#${(index + 1)}`,
                        minimumsatoshis: numeral(pool.amount).format('0,0'),
                        minimumfiat: this.formatPrice(pool.amount),
                        currentwaitingpool: `${pool.members} of 5`
                    })
                })

            })

    },
}
</script>

<style>
/*  */
</style>
