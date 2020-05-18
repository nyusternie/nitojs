<template>
    <div>
        <Highlights />

        <div class="row">
            <Pools />
            <Activity />
            <Community />
        </div>
    </div>
</template>

<script>
import Activity from '@/components/Dashboard/Activity'
import Community from '@/components/Dashboard/Community'
import Highlights from '@/components/Dashboard/Highlights'
import Pools from '@/components/Dashboard/Pools'

export default {
    components: {
        Activity,
        Community,
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
