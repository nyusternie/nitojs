<template>
    <!--Charts-->
    <div class="col-12">
        <chart-card title="BCH Community Anonymity View"
            sub-title="Showing the last 30 days of &quot;private&quot; transaction volume."
            :chart-data="usersChart.data"
            :chart-options="usersChart.options"
        >
            <span slot="footer">
                <i class="ti-reload"></i> updated 3 minutes ago
            </span>

            <div slot="legend" class="community-legend">
                <!-- <i class="fa fa-circle text-warning"></i> -->
                <i class="fa fa-circle text-info"></i>
                <a href="https://cashshuffle.com" target="_blank">CashShuffle</a>

                <!-- <i class="fa fa-circle text-danger"></i> -->
                <i class="fa fa-circle text-warning"></i>
                <a href="https://cashfusion.org" target="_blank">CashFusion</a>
            </div>
        </chart-card>
    </div>
</template>

<script>
/* Import modules. */
import Chartist from 'chartist'
import moment from 'moment'

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
            usersChart: {
                data: {
                    labels: [
                        moment().subtract(30, 'days').format('M/D'),
                        moment().subtract(26, 'days').format('M/D'),
                        moment().subtract(22, 'days').format('M/D'),
                        moment().subtract(18, 'days').format('M/D'),
                        moment().subtract(14, 'days').format('M/D'),
                        moment().subtract(10, 'days').format('M/D'),
                        moment().subtract(6, 'days').format('M/D'),
                        moment().subtract(2, 'days').format('M/D'),
                        'Now',
                    ],
                    series: [
                        [ 200, 220, 253, 320, 417, 535, 655, 855, 925 ],
                        [ 120, 150, 193, 240, 287, 335, 435, 442, 544 ],
                    ]
                    // series: [{
                    //     // name: 'series-1',
                    //     data: [ 200, 220, 253, 320, 417, 535, 655, 855, 925 ],
                    // }, {
                    //     // name: 'series-2',
                    //     data: [ 120, 150, 193, 240, 287, 335, 435, 442, 544 ],
                    // }]
                },
                options: {
                    low: 0,
                    high: 1000,
                    showArea: true,
                    // height: '245px',
                    axisX: {
                        showGrid: false
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 3
                    }),
                    showLine: true,
                    showPoint: false,
                    // chartPadding: 0,
                }
            }
        }
    },
    computed: {
        //
    },
    methods: {
        //
    }
}
</script>

<style>
/* .ct-series-a .ct-line,
.ct-series-a .ct-point {
    stroke: orange;
}
.ct-series-b .ct-line,
.ct-series-b .ct-point {
    stroke: red;
}

.ct-series-a .ct-area {
    fill: orange;
}
.ct-series-b .ct-area {
    fill: red;
} */
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
