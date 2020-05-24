<template>
    <main>
        <div class="row">
            <div class="col-md-4">
                <p-button
                    round
                    outline
                    block
                    @click.native="newSession"
                >
                    Create a new session
                </p-button>

                <p-button type="info"
                    round
                    block
                    @click.native="startShuffle"
                >
                    Start Shuffle
                </p-button>

                <p-button type="danger"
                    round
                    block
                    @click.native="stopShuffle"
                >
                    Stop Shuffle
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    To get started, click the <strong>"Create New Session"</strong> button.
                    Then just start depositing funds to the session address.
                    Be default, shuffling will begin automatically.
                </p>
            </div>
        </div>

        <hr />

        <card class="card" title="Session Manager">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Session Title"
                            :disabled="true"
                            placeholder="loading, please wait..."
                            v-model="session.title"
                        ></fg-input>

                        <fg-input type="text"
                            label="Current Status"
                            :disabled="true"
                            placeholder="loading, please wait..."
                            v-model="session.status"
                        ></fg-input>

                        <fg-input type="text"
                            label="Current Phase"
                            :disabled="true"
                            placeholder="loading, please wait..."
                            v-model="session.phase"
                        ></fg-input>
                    </div>

                    <div class="col-md-6 offset-md-1">
                        <div>
                            <h3><i class="fa fa-check-square mr-2"></i> Auto-start</h3>
                        </div>

                        <p class="setting-tip">
                            Will automatically start shuffling when new coins are added to the session.
                        </p>

                        <hr>

                        <div>
                            <h3><i class="fa fa-check-square mr-2"></i> Auto-reshuffle</h3>
                        </div>

                        <p class="setting-tip">
                            Will automatically start shuffling when change is added to the session.
                        </p>
                    </div>
                </div>

                <hr />

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Session Log</label>

                            <textarea rows="5" class="form-control border-input"
                                placeholder="Waiting for real-time updates..."
                                v-model="logDisplay">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="clearfix"></div>
            </form>
        </card>

        <hr />

        <card class="card-plain" :title="coins.title" :subTitle="coins.subTitle">
            <div class="table-full-width table-responsive">
                <paper-table type="hover" :title="coins.title" :sub-title="coins.subTitle" :data="coins.data"
                     :columns="coins.columns">

                 </paper-table>
             </div>
         </card>
    </main>
</template>

<script>
/* Import modules. */
const Nito = require('../../../../src/Nito.js')

/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import NotificationTemplate from '@/pages/Notifications/NotificationTemplate'

import { PaperTable } from '@/components'

const tableColumns = ['Id', 'Name', 'Salary', 'Country', 'City']

const tableData = [
    {
        id: 1,
        name: 'Dakota Rice',
        salary: '$36.738',
        country: 'Niger',
        city: 'Oud-Turnhout'
    },
    {
        id: 2,
        name: 'Minerva Hooper',
        salary: '$23,789',
        country: 'Curaçao',
        city: 'Sinaai-Waas'
    },
    {
        id: 3,
        name: 'Sage Rodriguez',
        salary: '$56,142',
        country: 'Netherlands',
        city: 'Baileux'
    },
    {
        id: 4,
        name: 'Philip Chaney',
        salary: '$38,735',
        country: 'Korea, South',
        city: 'Overland Park'
    },
    {
        id: 5,
        name: 'Doris Greene',
        salary: '$63,542',
        country: 'Malawi',
        city: 'Feldkirchen in Kärnten'
    }
]


export default {
    components: {
        PaperTable
    },
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

            coins: [],
            session: {
                id: 0,
                title: 'Session #1',
                status: null,
                phase: null,
                logs: [],
            },
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getCoinsBySession',
            'getDerivationPath',
            'getHDNode',
            'getSessions',
        ]),

        tableCoins() {
            coin = {
                title: 'Session Coins',
                subTitle: 'List of ALL coins added to this session.',
                columns: [...tableColumns],
                data: [...tableData]
            }

            return
        },

        logDisplay() {
            /* Map note details. */
            const notes = this.session.logs.map((_note) => {
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

        newSession() {
            this.createSession()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
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

            /* Handle Nito logs. */
            this.nito.on('notice', async (_notice) => {
                /* Set session notice. */
                this.session.logs.push(_notice)
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

        /* Set session status. */
        this.session.status = 'INACTIVE'

        /* Set session phase. */
        this.session.phase = 'INACTIVE'

        /* Retrieve coins. */
        this.coins = getCoinsBySession(this.session.id)
        console.log('COINS', coins)

    }
}
</script>

<style scoped>
.journal-row {
    border-bottom: 1pt solid rgba(180, 180, 180, 0.2);
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.setting-tip {
    margin-left: 40px;
    font-size: 0.9em;
}
</style>
