<template>
    <div class="col-md-6 col-12">
        <chart-card title="My Daily Activity"
            sub-title="Daily usage history of your CashShuffle activities"
            :chart-data="activityChart.data"
            :chart-options="activityChart.options"
        >
            <span slot="footer">
                <i class="ti-stats-up"></i> +2.4% increase in the last 24 hours
            </span>

            <div slot="legend">
                <i class="fa fa-circle text-warning"></i> My Activity
                <i class="fa fa-circle text-info"></i> Community Activity
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
            activityChart: {
                data: {
                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    series: [
                        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
                        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
                    ]
                },
                options: {
                    seriesBarDistance: 10,
                    axisX: {
                        showGrid: false
                    },
                    height: '245px'
                }
            },
        };
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
