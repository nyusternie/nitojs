<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <App />
        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
            <div class="row">
                <div class="col-md-4">
                    <p-button
                        round
                        outline
                        block
                        @click.native="resync"
                    >
                        Re-sync My Purse
                    </p-button>
                </div>

                <div class="col-md-8">
                    <p>
                        If you ever become out of sync with the network,
                        simply click the <strong>"Re-sync My Purse"</strong> button.
                        Your coins will be refreshed with the latest blockchain.
                    </p>
                </div>
            </div>

            <hr />

            <Purse />
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

import Purse from './Settings/Purse.vue'
import App from './Settings/App.vue'

export default {
    components: {
        Purse,
        App,
    },
    computed: {
        ...mapGetters('purse', [
            // 'getReceivingAccounts',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'updateCoins',
        ]),

        /**
         * Resync Purse
         */
        resync() {
            /* Update coins. */
            // FIXME: Why is this blocking the entire initial UI setup??
            this.updateCoins()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
        },

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
