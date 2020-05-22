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
                    <div class="col-md-6">
                        <fg-input type="text"
                            label="First Name"
                            placeholder="First Name"
                            v-model="session.firstName"
                        ></fg-input>
                    </div>

                    <div class="col-md-6">
                        <fg-input type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            v-model="session.lastName"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                            label="Address"
                            placeholder="Home Address"
                            v-model="session.address"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                            label="City"
                            placeholder="City"
                            v-model="session.city"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="text"
                            label="Country"
                            placeholder="Country"
                            v-model="session.country"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="number"
                            label="Postal Code"
                            placeholder="ZIP Code"
                            v-model="session.postalCode"
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
import { BITBOX } from 'bitbox-sdk'

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
                this.bitbox = new BITBOX()
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

            /* Set account index. */
            const acctIndex = 0

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

            /* Set account index. */
            const acctIndex = 0

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
            /* Import local modules. */
            const ShuffleClient = require('../../../../libs/cashshuffle/ShuffleClient.js')
            console.log('MANAGER (client):', ShuffleClient)

            this.session.id = 0 // FOR DEVELOPMENT PURPOSES ONLY

            const coins = this.getCoinsBySession(this.session.id)
            console.log('MANAGER (coins):', coins)

            const coin = coins[Object.keys(coins)[0]]
            console.log('MANAGER (coin):', JSON.stringify(coin, null, 4))

            console.log('MANAGER (target):', this.target())
            console.log('MANAGER (change):', this.change())

            /* Initialize new shuffle manager. */
            const shuffleManager = new ShuffleClient({
                coins: [ coin ],
                hooks: {
                    change: this.change, // NOTE: This is a function.
                    shuffled: this.target, // NOTE: This is a function.
                },
                protocolVersion: 300,
                maxShuffleRounds: 1,
                // Disable automatically joining shuffle rounds
                // once a connection with the server is established
                disableAutoShuffle: false,
                serverStatsUri: 'https://shuffle.servo.cash:8080/stats'
                // serverStatsUri: 'https://cashshuffle.c3-soft.com:9999/stats'
            })

            shuffleManager.on('shuffle', async (shuffleRound) => {
                console.log(`Coin ${shuffleRound.coin.txid}:${shuffleRound.coin.vout} has been successfully shuffled!`)
            })

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
