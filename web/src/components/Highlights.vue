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
/* Import modules. */
import { BITBOX } from 'bitbox-sdk'
import numeral from 'numeral'

/* Import components. */
import { StatsCard } from '@/components'

export default {
    components: {
        StatsCard,
    },
    data: () => {
        return {
            bitbox: null,
            usd: 0,

            statsCards: [
                {
                    type: 'warning',
                    icon: 'ti-money',
                    title: 'BCH Price',
                    value: '',
                    footerText: 'Updated now',
                    footerIcon: 'ti-reload'
                },
                {
                    type: 'success',
                    icon: 'ti-wallet',
                    title: 'Revenue',
                    value: '$1,345',
                    footerText: 'Last day',
                    footerIcon: 'ti-calendar'
                },
                {
                    type: 'danger',
                    icon: 'ti-pulse',
                    title: 'Errors',
                    value: '23',
                    footerText: 'In the last hour',
                    footerIcon: 'ti-timer'
                },
                {
                    type: 'info',
                    icon: 'ti-twitter-alt',
                    title: 'Followers',
                    value: '+45',
                    footerText: 'Updated now',
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
            return numeral(this.usd / 100).format('$0.00[00]')
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

                /* Set card value. */
                this.statsCards[0].value = this.formatPrice(current)
            } catch (err) {
                console.error(err)
            }
        },

        /**
         * Goto (Page Location)
         */
        goto(_location) {
            this.$router.push(_location)
        },
    },
    created: function () {
        /* Initialize BITBOX. */
        this.initBitbox()

        /* Update USD. */
        this.updatePrice()
    },
    mounted: function () {
        //
    },
}
</script>

<style>
.numbers {
    font-size: 1.8em !important;
}
</style>
