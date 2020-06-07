<template>
    <div :class="{'nav-open': $sidebar.showSidebar}">
        <notifications></notifications>
        <router-view></router-view>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'

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

        /**
         * Security Check
         *
         * FIXME: We should restrict this forced redirect to ONLY
         *        hosted instances and NOT localhost.
         */
        securityCheck() {
            /* Validate security for ALL Nito distributions. */
            if (process.env.NODE_ENV === 'production') {
                /* Validate SSL connection. */
                if (window.location.protocol === 'http:') {
                    /* Set secure URL. */
                    const secureUrl = window.location.href
                        .replace('http', 'https')

                    /* Redirect to secure URL. */
                    window.location.replace(secureUrl)
                }
            }
        },

        /**
         * Initialize (Application)
         */
        async init() {
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

            /* Set locale. */
            // FIXME: We need to do some browser detection here.
            // this.$i18n.locale = 'en'

            /* Retrieve application version. */
            // TODO: Display CHANGELOG when new version is detected.
            const appVersion = require('../package.json').version
            console.info('Application version', appVersion) // eslint-disable-line no-console

        },
    },
    created: async function () {
        // console.log('APPLICATION STATE', this.$store.state)
        console.log('Initializing Nito Cash...')

        /* Security check. */
        this.securityCheck()

        /* Initialize application. */
        this.init()

        // FOR DEVELOPMENT PURPOSES ONLY
        // const blockHeight = await Nito.Blockchain.Query.getBlockHeight()
        // console.log('BLOCK HEIGHT', blockHeight)

        // const blockchain = new Nito.Blockchain()
        // console.log('BLOCKCHAIN', blockchain)

        // const socket = new blockchain.Socket()
        // console.log('SOCKET', socket)

        // socket.watchAddress('qqy0l8y249dr4suvalvqunzxmp6kgslxd5uve0j4y2')

        // socket.on('data', (msg) => {
        //     console.log('APP RECEIVED A MESSAGE (data):', msg)
        //     socket.close()
        // })
        // socket.on('open', msg => {
        //     console.log('APP RECEIVED A MESSAGE (open):', msg)
        //     socket.close()
        // })
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
