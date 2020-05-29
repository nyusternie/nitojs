<template>
    <div class="row">
        <div class="col-12 col-md-4">
            <App />
        </div>

        <div class="col-12 col-md-8">
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
