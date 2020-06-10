<template>
    <div class="row">
        <div class="row mb-2">
            <div class="col-sm-4 col-md-3 offset-md-1 mb-2">
                <div class="mx-2">
                    <p-button
                        round
                        block
                        @click.native="changePool(1)"
                    >
                        shuffle.servo.cash
                    </p-button>

                    <p-button
                        round
                        outline
                        block
                        @click.native="changePool(2)"
                    >
                        cashshuffle.c3-soft.com
                    </p-button>
                </div>
            </div>

            <div class="col-md-7">
                <p class="mx-3">
                    CashShuffle servers are <strong>public</strong>
                    and <strong>"free"</strong> <em>(as in beer)</em>.
                    <br class="d-none d-md-block" />
                    Please show your appreciate for their community service with
                    <i class="fa fa-heart text-danger"></i> and support that
                    <a href="https://causes.cash" target="_blank">
                        <strong class="text-danger">Causes Cash</strong>
                    </a> for their continued development.
                </p>
            </div>
        </div>

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
import Nito from 'nitojs'
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
            usd: 0,

            pools: {
                title: 'CashShuffle Pool Statistics',
                subTitle: 'loading...',
                name: 'shuffle.servo.cash:8080',
                uri: 'https://shuffle.servo.cash:8080/stats',
                columns: [
                    'Pool Id',
                    'Minimum BCH',
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
        changePool(_poolId) {
            switch(_poolId) {
            case 1:
                this.pools.name = 'shuffle.servo.cash'
                this.pools.uri = 'https://shuffle.servo.cash:8080/stats'
                break
            case 2:
                this.pools.name = 'cashshuffle.c3-soft.com'
                this.pools.uri = 'https://cashshuffle.c3-soft.com:9999/stats'
                break
            default:
                this.pools.name = 'shuffle.servo.cash'
                this.pools.uri = 'https://shuffle.servo.cash:8080/stats'
            }

            /* Load pool. */
            this.loadPool()
        },

        loadPool() {
            /* Set server URI. */
            const serverUri = this.pools.uri

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
                    this.pools.subTitle = `Your current pool is [ ${this.pools.name} ] serving [ ${data.body.connections} ] active connections`

                    // console.log('Stats:', stats)

                    /* Clear pool data. */
                    this.pools.data = []

                    stats.forEach((pool, index) => {
                        this.pools.data.push({
                            poolid: `#${(index + 1)}`,
                            minimumbch: this.formatBCH(pool.amount),
                            minimumfiat: this.formatPrice(pool.amount),
                            currentwaitingpool: `${pool.members} of 5`
                        })
                    })

                })

        },

        /**
         * Format BCH
         */
        formatBCH: function (_satoshis) {
            /* Set value. */
            const value = (_satoshis / 100000000)

            /* Return formatted value. */
            return numeral(value).format('0,0.00[00]')
        },

        /**
         * Format Price
         */
        formatPrice: function (_satoshis) {
            /* Set value. */
            const value = (_satoshis / 100000000) * this.usd

            /* Return formatted value. */
            return numeral(value).format('$0,0.00[00]')
        },

        /**
         * Update Price
         */
        async updatePrice() {
            try {
                /* Request current price. */
                const current = await Nito.Markets.getTicker('usd')

                /* Set current price. */
                this.usd = current
            } catch (err) {
                console.error(err)
            }
        },
    },
    created: async function () {
        /* Update USD. */
        await this.updatePrice()

        /* Load / set active pool. */
        this.loadPool()
    },
}
</script>

<style scoped>
/*  */
</style>
