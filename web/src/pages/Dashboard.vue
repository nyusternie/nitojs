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
/* Import components. */
import Activity from './Dashboard/Activity'
import Community from './Dashboard/Community'
import Highlights from './Dashboard/Highlights'
import Pools from './Dashboard/Pools'

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
