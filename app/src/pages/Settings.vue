<template>
    <div class="row">
        <div class="col-12 col-xl-8 order-xl-2">
            <Purse />
        </div>

        <div class="col-12 col-xl-4 order-xl-1">
            <hr class="d-xl-none" />

            <App />
        </div>
    </div>
</template>

<script>
/* Import components. */
import App from './Settings/App.vue'
import Purse from './Settings/Purse.vue'

export default {
    components: {
        App,
        Purse,
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
