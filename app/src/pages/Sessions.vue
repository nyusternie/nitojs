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
