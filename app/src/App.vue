<template>
    <div :class="{'nav-open': $sidebar.showSidebar}">
        <notifications></notifications>
        <router-view></router-view>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            //
        ]),
    },
    methods: {
        ...mapActions([
            //
        ]),

        ...mapActions('purse', [
            'initPurse',
        ]),

    },
    created: async function () {
        // console.log('APPLICATION STATE', this.$store.state)

        /* Initialize purse. */
        const newPurse = await this.initPurse()

        /* Validate new purse. */
        if (newPurse) {
            /* Set message. */
            const message = `Welcome to NitoJS! A new purse has been created for your coins.`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-pin-alt', // ti-info-alt | ti-alert | ti-pin-alt
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'warning', // info | danger | warning
                timeout: 0, // 0: persistent | 5000: default
            })
        }
    },
    mounted: function () {
        //
    },
}
</script>

<style lang="scss">
.toggleFlag {
    cursor: pointer;
}

.vue-notifyjs.notifications {
    .alert {
        z-index: 10000;
    }
    .list-move {
        transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active {
        transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
        transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
        opacity: 0;
        transform: scale(1.1);
    }
    .list-leave-to {
        opacity: 0;
        transform: scale(1.2, 0.7);
    }
}
</style>
