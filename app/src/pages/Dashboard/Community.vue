<template>
    <!--Charts-->
    <div class="col-12">
        <chart-card title="Bitcoin Cash Privacy Transactions"
            sub-title="Showing the last 3 months of transaction volume"
            :chart-data="usersChart.data"
            :chart-options="usersChart.options"
        >
            <span slot="footer">
                <i class="ti-reload"></i> updated 3 minutes ago
            </span>

            <div slot="legend" class="community-legend">
                <i class="fa fa-circle cashshuffle"></i>
                <a href="https://cashshuffle.com" target="_blank">CashShuffle</a>

                <i class="fa fa-circle cashfusion"></i>
                <a href="https://cashfusion.org" target="_blank">CashFusion</a>
            </div>
        </chart-card>
    </div>
</template>

<script>
/* Import modules. */
import Chartist from 'chartist'
import moment from 'moment'
import superagent from 'superagent'

/* Import components. */
import { ChartCard } from '@/components'

export default {
    components: {
        ChartCard,
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data: () => {
        return {
            fusionData: null,
            shuffleData: null,
            // chartMax: 50,
            usersChart: null,
        }
    },
    computed: {
        chartData() {
            if (this.usersChart) {
                return this.usersChart.data
            } else {
                return null
            }
        },

        chartOptions() {
            if (this.usersChart) {
                return this.usersChart.options
            } else {
                return null
            }
        },
    },
    methods: {
        /**
         * Load Daily
         */
        async loadDaily() {
            /**
             * Calculate Weekly Total
             */
            const _calcWeeklyTotal = (_data, _start, _end) => {
                let total = 0

                for (let i = _start; i <= _end; i++) {
                    total += _data[i]
                }

                return total
            }

            /* Set endpoint. */
            const dailyFusion = 'https://cloud.nito.exchange/v1/cashfusion/daily/90'
            const dailyShuffle = 'https://cloud.nito.exchange/v1/cashshuffle/daily/90'

            const fusionData = await superagent
                .get(dailyFusion)
                .catch(err => console.error(err))

            const shuffleData = await superagent
                .get(dailyShuffle)
                .catch(err => console.error(err))

            /* Validate data. */
            if (shuffleData && shuffleData.body) {
                const body = shuffleData.body
                // console.log('SHUFFLE DATA', body.data)

                const chartData = body.data.map(item => item.value.sum)
                // console.log('CHART DATA', chartData)

                this.shuffleData = [
                    // _calcWeeklyTotal(chartData, 84, chartData.length - 1),
                    _calcWeeklyTotal(chartData, 70, 83),
                    _calcWeeklyTotal(chartData, 56, 69),
                    _calcWeeklyTotal(chartData, 42, 55),
                    _calcWeeklyTotal(chartData, 28, 41),
                    _calcWeeklyTotal(chartData, 14, 27),
                    _calcWeeklyTotal(chartData, 0, 13),
                ]
            }

            /* Validate data. */
            if (fusionData && fusionData.body) {
                const body = fusionData.body
                // console.log('FUSION DATA', body.data)

                const chartData = body.data.map(item => item.value.sum)
                // console.log('CHART DATA', chartData)

                this.fusionData = [
                    // _calcWeeklyTotal(chartData, 84, chartData.length - 1),
                    _calcWeeklyTotal(chartData, 70, 83),
                    _calcWeeklyTotal(chartData, 56, 69),
                    _calcWeeklyTotal(chartData, 42, 55),
                    _calcWeeklyTotal(chartData, 28, 41),
                    _calcWeeklyTotal(chartData, 14, 27),
                    _calcWeeklyTotal(chartData, 0, 13),
                ]
            }

            /* Initialize chart. */
            this.initChart()

        },

        initChart() {
            /* Initialize chart */
            this.usersChart = {
                data: {
                    labels: [
                        // moment().subtract(90, 'days').format('M/D') + ' - ' + moment().subtract(77, 'days').format('M/D'),
                        moment().subtract(83, 'days').format('M/D') + ' - ' + moment().subtract(70, 'days').format('M/D'),
                        moment().subtract(69, 'days').format('M/D') + ' - ' + moment().subtract(56, 'days').format('M/D'),
                        moment().subtract(55, 'days').format('M/D') + ' - ' + moment().subtract(42, 'days').format('M/D'),
                        moment().subtract(41, 'days').format('M/D') + ' - ' + moment().subtract(28, 'days').format('M/D'),
                        moment().subtract(27, 'days').format('M/D') + ' - ' + moment().subtract(14, 'days').format('M/D'),
                        // moment().subtract(13, 'days').format('M/D') + ' - ' + moment().subtract(0, 'days').format('M/D'),
                        'Now',
                    ],
                    series: [{
                        name: 'CashShuffle',
                        className: 'cashshuffle',
                        data: this.shuffleData,

                    }, {
                        name: 'CashFusion',
                        className: 'cashfusion',
                        data: this.fusionData,
                    }]
                },
                options: {
                    low: 0,
                    // high: this.chartMax,
                    showArea: true,
                    // height: '245px',
                    axisX: {
                        showGrid: false
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 3
                    }),
                    showLine: true,
                    // showPoint: false,
                    // chartPadding: 0,
                }
            }

        }
    },
    created: function () {
        // this.usersChart = {
        //     data: {},
        //     options: {},
        // }

        /* Load daily data. */
        this.loadDaily()

    },
}
</script>

<style>
i.cashshuffle {
    color: #ff6701;
}
.cashshuffle .ct-line,
.cashshuffle .ct-point {
    stroke: #ff6701;
}
.cashshuffle .ct-area {
    fill: #ff6701;
}

i.cashfusion {
    color: #01b462;
}
.cashfusion .ct-line,
.cashfusion .ct-point {
    stroke: #01b462;
}
.cashfusion .ct-area {
    fill: #01b462;
}
</style>

<style scoped>
.community-legend a {
    color: black;
    font-weight: 600;
    margin-right: 20px;
}

.community-legend a:hover {
    color: red;
}
</style>
