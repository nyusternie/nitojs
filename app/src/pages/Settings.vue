<template>
    <div class="row">
        <div class="col-12 col-md-8 order-md-1">
            <Purse />
        </div>

        <div class="col-12 col-md-4">
            <hr class="d-md-none" />

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
