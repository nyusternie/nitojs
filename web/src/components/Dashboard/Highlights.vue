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
                    title: 'BCH / USD',
                    value: '$0.00',
                    footerText: '+2.7% in the last 24hrs',
                    footerIcon: 'ti-stats-up'
                },
                {
                    type: 'success',
                    icon: 'ti-wallet',
                    title: 'Managing',
                    value: '$1,345',
                    footerText: 'in 4 active sesions',
                    footerIcon: 'ti-pulse'
                },
                {
                    type: 'danger',
                    icon: 'ti-check-box',
                    title: 'Completed',
                    value: '23',
                    footerText: 'in the last 30 days',
                    footerIcon: 'ti-timer'
                },
                {
                    type: 'info',
                    icon: 'ti-signal',
                    title: 'Peers Online',
                    value: '28+',
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
            return numeral(this.usd / 100).format('$0.00[00]')
        },

        /**
         * Initialize BITBOX
         */
        initBitbox() {
            console.info('Initializing BITBOX..')

            try {
                /* Initialize BITBOX. */
                // this.bitbox = new BITBOX()
                this.bitbox = new window.BITBOX()
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

<style scoped>
.numbers {
    font-size: 1.8em !important;
}
.icon-big {
    /* border: 1pt solid red; */
}
</style>
