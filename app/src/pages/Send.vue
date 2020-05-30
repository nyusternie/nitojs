<template>
    <div class="row">
        <div class="col-12 col-xl-7 order-xl-2">
            <Outbox />
        </div>

        <div class="col-12 col-xl-5 order-xl-1">
            <Coins />
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
