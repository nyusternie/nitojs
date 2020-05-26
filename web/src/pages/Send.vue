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

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

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

        notifyVue(verticalAlign, horizontalAlign, type=null, icon=null) {
            if (!type) {
                const color = Math.floor(Math.random() * 4 + 1)
                type = this.type[color]
            }

            if (!icon) {
                icon = 'ti-gift'
            }

            this.$notify({
                // component: NotificationTemplate,
                component: NewSession,
                icon,
                horizontalAlign,
                verticalAlign,
                type
            })
        }
    },
}
</script>

<style scoped>
/*  */
</style>
