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
                            v-model="session.phase"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Session Updates</label>

                            <textarea rows="5" class="form-control border-input"
                                placeholder="Waiting for real-time updates..."
                                v-model="notesDisplay">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="text-center mr-3">
                    <p-button type="info"
                        round
                        @click.native="startShuffle"
                    >
                        Start Shuffle
                    </p-button>

                    <p-button type="danger ml-3"
                        round
                        @click.native="stopShuffle"
                    >
                        Stop Shuffle
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
            nito: null,
            shuffleManager: null,

            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            },

            session: {
                id: 0,
                title: 'Session #1',
                username: 'michael23',
                phase: null,
                notices: [],
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

        notesDisplay() {
            /* Map note details. */
            const notes = this.session.notices.map((_note) => {
                return `${_note.number} members waiting...\n`
                // if (_note.session) {
                //     return `${_note.number} members waiting on [${_note.session}]\n`
                // } else {
                //     return `${_note.number} members waiting...\n`
                // }
            })

            /* Return (reversed) notes. */
            return notes.reverse()
        }

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
            this.nito = new Nito()

            /* Handle Nito phases. */
            this.nito.on('phase', async (_phase) => {
                /* Set session phase. */
                this.session.phase = _phase
            })

            /* Handle Nito notices. */
            this.nito.on('notice', async (_notice) => {
                /* Set session notice. */
                this.session.notices.push(_notice)
            })

            /* Start shuffle manager. */
            this.shuffleManager = this.nito
                .getShuffleManager(coin, this.change, this.target, false)
        },

        stopShuffle() {
            /* Validate shuffle manager. */
            if (this.shuffleManager) {
                /* Stop shuffle. */
                this.shuffleManager.stop()
            }
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
