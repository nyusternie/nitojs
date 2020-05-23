<template>
    <card class="card" title="Session Manager">
        <div>
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Session Title"
                            :disabled="true"
                            placeholder="Title"
                            v-model="session.title"
                        ></fg-input>
                    </div>

                    <div class="col-md-3">
                        <fg-input type="text"
                            label="Username"
                            placeholder="Username"
                            v-model="session.username"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="email"
                            label="Username"
                            placeholder="Email"
                            v-model="session.email"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <fg-input type="text"
                            label="Current Phase"
                            placeholder="loading, please wait..."
                            v-model="phase"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Session Notes</label>

                            <textarea rows="5" class="form-control border-input"
                                placeholder="Add your session notes here"
                                v-model="session.notes">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <p-button type="info"
                        round
                        @click.native="startShuffle"
                    >
                        Start Shuffle
                    </p-button>
                </div>

                <div class="clearfix"></div>
            </form>
        </div>
    </card>
</template>

<script>
/* Import modules. */
const Nito = require('../../../../src/Nito.js')

/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import NotificationTemplate from '@/pages/Notifications/NotificationTemplate'

export default {
    data() {
        return {
            bitbox: null,

            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            },

            nito: null,
            phase: null,
            notice: null,

            session: {
                id: 0,
                title: 'Session #1',
                username: 'michael23',
                email: '',
                firstName: 'Chet',
                lastName: 'Faker',
                address: 'Melbourne, Australia',
                city: 'Melbourne',
                postalCode: '',
                notes: `We must accept finite disappointment, but hold on to infinite hope.`
            }
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getCoinsBySession',
            'getDerivationPath',
            'getHDNode',
            'getSessions',
        ]),

    },
    methods: {
        ...mapActions('purse', [
            // 'initSession',
        ]),

        /**
         * Initialize BITBOX
         */
        initBitbox() {
            console.info('Initializing BITBOX..')

            try {
                /* Initialize BITBOX. */
                // this.bitbox = new BITBOX()
                this.bitbox = new window.BITBOX()
            } catch (err) {
                console.error(err)
            }
        },

        /**
         * Change Account
         */
        change() {
            /* Set chain. */
            const chain = 1 // change account

            /* Set sessions. */
            const sessions = this.getSessions
            // console.log('TARGET (sessions):', sessions)

            /* Set accounts. */
            const accounts = sessions[this.session.id].accounts
            // console.log('TARGET (accounts):', accounts)

            /* Set account index. */
            const acctIndex = accounts.change

            /* Set derivation path. */
            const path = this.getDerivationPath(this.session.id, chain, acctIndex)
            console.log('MANAGER (path)', path)

            /* Initialize HD node. */
            const hdNode = this.getHDNode

            /* Initialize child node. */
            const childNode = hdNode.derivePath(path)

            /* Set (change) account. */
            const account = this.bitbox.HDNode.toCashAddress(childNode)
            console.log('MANAGER (change account)', account)

            return {
                cashAddress: account,
                legacyAddress: this.bitbox.Address.toLegacyAddress(account),
            }
        },

        /**
         * Target Account
         */
        target() {
            /* Set chain. */
            const chain = 7867 // Nito Cash account

            /* Set sessions. */
            const sessions = this.getSessions
            // console.log('TARGET (sessions):', sessions)

            /* Set accounts. */
            const accounts = sessions[this.session.id].accounts
            // console.log('TARGET (accounts):', accounts)

            /* Set account index. */
            const acctIndex = accounts.nito

            /* Set derivation path. */
            const path = this.getDerivationPath(this.session.id, chain, acctIndex)
            console.log('MANAGER (path)', path)

            /* Initialize HD node. */
            const hdNode = this.getHDNode

            /* Initialize child node. */
            const childNode = hdNode.derivePath(path)

            /* Set (receiving) account. */
            const account = this.bitbox.HDNode.toCashAddress(childNode)
            console.log('MANAGER (nito cash account)', account)

            return {
                cashAddress: account,
                legacyAddress: this.bitbox.Address.toLegacyAddress(account),
            }
        },

        startShuffle() {
            this.session.id = 0 // FOR DEVELOPMENT PURPOSES ONLY

            const coins = this.getCoinsBySession(this.session.id)
            console.log('MANAGER (coins):', coins)

            const coin = coins[Object.keys(coins)[0]]
            console.log('MANAGER (coin):', JSON.stringify(coin, null, 4))

            console.log('MANAGER (target):', this.target())
            console.log('MANAGER (change):', this.change())

            /* Initialize Nito. */
            const nito = new Nito()

            /* Handle Nito phases. */
            nito.on('phase', async (_phase) => {
                /* Set phase. */
                this.phase = _phase
            })

            /* Handle Nito notices. */
            nito.on('notice', async (_notice) => {
                /* Set notice. */
                this.notice = _notice
            })

            /* Start shuffle manager. */
            nito.startShuffleManager(coin, this.change, this.target)
        },

        stopShuffle() {

        },

        notifyVue(verticalAlign, horizontalAlign) {
            const color = Math.floor(Math.random() * 4 + 1)

            this.$notify({
                component: NotificationTemplate,
                icon: 'ti-gift',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.type[color]
            })
        }
    },
    created: function () {
        /* Initialize BITBOX. */
        this.initBitbox()

    }
}
</script>

<style scoped>
.journal-row {
    border-bottom: 1pt solid rgba(180, 180, 180, 0.2);
    padding-bottom: 10px;
    margin-bottom: 10px;
}
</style>
