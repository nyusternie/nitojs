<template>
    <div class="row">
        <div class="col-12 col-xl-8 order-xl-2">
            <Manager />
        </div>

        <div class="col-12 col-xl-4 order-xl-1">
            <Deposit />
            <Cabinet />
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
            //
        ]),

    },
    created: function () {
        console.log('SESSIONS:', this.getSessions)
        console.log('SESSION ID:', this.getActiveSessionId)
    },
}
</script>

<style scoped>
/*  */
</style>
