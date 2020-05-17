<template>
    <main>
        <img alt="Vue logo" src="@/assets/logo.png">
    </main>
</template>

<script>
/* Import modules. */
import Nito from '../../index'

export default {
    components: {
        //
    },
    created: function () {
        console.log('Loading Manager...')

        const nito = new Nito()
        console.log('Nito (status):', nito.status())

        // FOR DEVELOPMENT PURPOSES ONLY
        nito.on('test', (result) => {
            console.log('TEST HANDLER (result):', result)
        })

        // FOR DEVELOPMENT PURPOSES ONLY
        nito.test()
    },
}
</script>

<style>
/*  */
</style>
