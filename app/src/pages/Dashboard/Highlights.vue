<template>
    <!--Stats cards-->
    <div class="row">
        <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
            <stats-card>
                <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
                    <i :class="stats.icon"></i>
                </div>

                <div class="numbers" slot="content">
                    <p>{{stats.title}}</p>
                    {{stats.value}}
                </div>

                <div class="stats" slot="footer">
                    <i :class="stats.footerIcon"></i>
                    {{stats.footerText}}
                </div>
            </stats-card>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral'

/* Import components. */
import Nito from 'nitojs'
import { StatsCard } from '@/components'

export default {
    components: {
        StatsCard,
    },
    data: () => {
        return {
            usd: 0,

            statsCards: [
                {
                    type: 'warning',
                    icon: 'ti-money',
                    title: 'BCH / USD',
                    value: '$0.00',
                    footerText: 'loading...',
                    footerIcon: 'ti-stats-up'
                },
                {
                    type: 'success',
                    icon: 'ti-server',
                    title: 'My Purse',
                    value: '$1,345',
                    footerText: 'in 4 active sesions',
                    footerIcon: 'ti-pulse'
                },
                {
                    type: 'danger',
                    icon: 'ti-pulse',
                    title: 'My Sessions',
                    value: '23',
                    footerText: 'since May 15, 2020',
                    footerIcon: 'ti-timer'
                },
                {
                    type: 'info',
                    icon: 'ti-signal',
                    title: 'Peers Online',
                    value: '28',
                    footerText: 'updated 20 seconds ago',
                    footerIcon: 'ti-reload'
                }
            ],

        }
    },
    computed: {
        displayPrice: function () {
            return numeral(this.usd / 100).format('$0.00[00]')
        }
    },
    methods: {
        /**
         * Format Price
         */
        formatPrice: function () {
            return numeral(this.usd).format('$0.00')
        },

        /**
         * Update Price
         */
        async updatePrice() {
            /* Request current quote. */
            const quote = await Nito.Markets.getQuote('bch')
                .catch(err => console.error(err)) // eslint-disable-line no-console
            // console.log('CURRENT QUOTE', data)

            /* Set current price. */
            this.usd = quote.price
            // console.log('CURRENT USD', this.usd)

            /* Set card value. */
            this.statsCards[0].value = this.formatPrice(quote.price)

            /* Set percentage change (last 24 hours). */
            const change = numeral(quote.percent_change_24h).format('0.00')

            /* Set card footer. */
            this.statsCards[0].footerText = `${change}% in the last 24hrs`
        },

        /**
         * Goto (Page Location)
         */
        goto(_location) {
            this.$router.push(_location)
        },
    },
    created: function () {
        /* Update ticker price (in USD). */
        this.updatePrice()
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.numbers {
    font-size: 1.8em !important;
}
.icon-big {
    /* border: 1pt solid red; */
}
</style>
