<template>
    <div class="col-md-6 col-12">
        <chart-card title="My Pool Activity"
            sub-title="CashShuffle pool usage and activity (in bits)"
            :chart-data="preferencesChart.data"
            chart-type="Pie"
        >
            <span slot="footer">
                <i class="ti-control-shuffle"></i>
                your last shuffle was in [ <strong>0.001</strong> ] 12 hours ago
            </span>

            <div slot="legend">
                <i class="fa fa-circle text-info"></i> 0.0001
                <i class="fa fa-circle text-warning"></i> 0.001
                <i class="fa fa-circle text-danger"></i> 0.01
                <i class="fa fa-circle text-success"></i> 0.1
                <i class="fa fa-circle text-primary"></i> 1.0
                <i class="fa fa-circle text-secondary"></i> 10.0+
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
            preferencesChart: {
                data: {
                    labels: [ '32%', '42%', '26%', '42%', '26%', '42%' ],
                    series: [ 32, 42, 26, 42, 26, 42 ]
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
