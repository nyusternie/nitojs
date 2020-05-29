<template>
    <div class="row">
        <div class="col-md-5">
            <Coins />
        </div>

        <div class="col-md-7">
            <Outbox />
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import Coins from './Send/Coins.vue'
import Outbox from './Send/Outbox.vue'

export default {
    components: {
        Coins,
        Outbox,
    },
    computed: {
        ...mapGetters('purse', [
            // 'getReceivingCoins',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            //
        ]),

    },
}
</script>

<style scoped>
/*  */
</style>
