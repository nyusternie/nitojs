<template>
    <!--Charts-->
    <div class="col-12">
        <chart-card title="BCH Community Anonymity"
            sub-title="Last 24 hours of privacy activity"
            :chart-data="usersChart.data"
            :chart-options="usersChart.options"
        >
            <span slot="footer">
                <i class="ti-reload"></i> updated 3 minutes ago
            </span>

            <div slot="legend">
                <i class="fa fa-circle text-info"></i> Nito Exchange
                <i class="fa fa-circle text-warning"></i> CashShuffle
                <i class="fa fa-circle text-danger"></i> CashFusion
            </div>
        </chart-card>
    </div>
</template>

<script>
/* Import modules. */
import Chartist from 'chartist'

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
                        '9:00AM',
                        '12:00AM',
                        '3:00PM',
                        '6:00PM',
                        '9:00PM',
                        '12:00PM',
                        '3:00AM',
                        '6:00AM'
                    ],
                    series: [
                        [287, 385, 490, 562, 594, 626, 698, 895, 952],
                        [67, 152, 193, 240, 387, 435, 535, 642, 744],
                        [23, 113, 67, 108, 190, 239, 307, 410, 410],
                    ]
                },
                options: {
                    low: 0,
                    high: 1000,
                    showArea: true,
                    height: '245px',
                    axisX: {
                        showGrid: false
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 3
                    }),
                    showLine: true,
                    showPoint: false
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
/*  */
</style>
