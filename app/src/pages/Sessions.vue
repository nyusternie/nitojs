<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <Deposit />
            <Cabinet />
        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
            <Manager />
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Cabinet from './Sessions/Cabinet'
import Deposit from './Sessions/Deposit'
import Manager from './Sessions/Manager'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

export default {
    components: {
        Cabinet,
        Deposit,
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
            'getActiveSessionId',
            'getSessions',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            'createSession',
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
    created: function () {
        console.log('SESSION ID:', this.getActiveSessionId)
        console.log('SESSIONS:', this.getSessions)
    },
}
</script>

<style scoped>
/*  */
</style>
