<template>
    <!--Charts-->
    <div class="col-12">
        <chart-card title="Users behavior"
            sub-title="24 Hours performance"
            :chart-data="usersChart.data"
            :chart-options="usersChart.options"
        >
            <span slot="footer">
                <i class="ti-reload"></i> Updated 3 minutes ago
            </span>

            <div slot="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
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
                        [23, 113, 67, 108, 190, 239, 307, 410, 410]
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
            },
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
                        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
                        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
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
            preferencesChart: {
                data: {
                    labels: ['62%', '32%', '6%'],
                    series: [62, 32, 6]
                },
                options: {}
            }
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
