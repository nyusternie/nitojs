<template>
    <div class="row">
        <div class="col-md-4 col-12">
            <App />
        </div>

        <div class="col-md-8 col-12">
            <Purse />
        </div>
    </div>
</template>

<script>
/* Import components. */
import Purse from './Settings/Purse.vue'
import App from './Settings/App.vue'

export default {
    components: {
        Purse,
        App,
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        /* Set message. */
        const message = `Oops! Looks like you don't have a purse yet.`

        /* Display notification. */
        this.$notify({
            message,
            icon: 'ti-alert', // ti-info-alt | ti-alert
            verticalAlign: 'top',
            horizontalAlign: 'right',
            type: 'danger', // info | danger
        })
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
