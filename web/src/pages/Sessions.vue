<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <Deposit />
            <Journal />
        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
            <div class="row">
                <div class="col-md-4">
                    <p-button
                        round
                        outline
                        block
                        @click.native="createSession"
                    >
                        Create a new session
                    </p-button>
                </div>

                <div class="col-md-8">
                    <p>
                        To get started, click the "Create New Session".
                        You will then be able to start depositing funds to the session address.
                        Be default, shuffling will begin automatically.
                    </p>
                </div>
            </div>

            <hr />

            <Manager />
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Deposit from './Sessions/Deposit'
import Journal from './Sessions/Journal'
import Manager from './Sessions/Manager'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

export default {
    components: {
        Deposit,
        Journal,
        Manager,
    },
    data() {
        return {
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            }
        };
    },
    computed: {
        ...mapGetters('purse', [
            // 'getReceivingAccounts',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            'initSession',
        ]),

        createSession() {
            this.initSession()

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
