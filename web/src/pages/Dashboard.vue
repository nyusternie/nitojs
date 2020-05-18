<template>
    <div>
        <Highlights />

        <div class="row">
            <Charts />

            <Pools />
            <Activity />
        </div>
    </div>
</template>

<script>
import Activity from '@/components/Dashboard/Activity'
import Charts from '@/components/Dashboard/Charts'
import Highlights from '@/components/Dashboard/Highlights'
import Pools from '@/components/Dashboard/Pools'

export default {
    components: {
        Activity,
        Charts,
        Highlights,
        Pools,
    },
    created: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
