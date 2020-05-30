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
                <i class="fa fa-circle text-info"></i>
                <a href="https://nito.exchange" target="_blank">Nito Exchange</a>

                <i class="fa fa-circle text-warning"></i>
                <a href="https://cashshuffle.com" target="_blank">CashShuffle</a>

                <i class="fa fa-circle text-danger"></i>
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
                        [ 77, 152, 213, 270, 327, 535, 655, 855, 925 ],
                        [ 67, 123, 193, 240, 287, 335, 435, 442, 544 ],
                        [ 23, 40, 67, 98, 155, 279, 327, 370, 390 ],
                    ]
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
