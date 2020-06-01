<template>
    <main>
        <div class="row">
            <div class="col-md-4 mb-3">
                <p-button
                    round
                    outline
                    block
                    @click.native="createSession"
                >
                    Create a new session
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

        <hr v-if="getSessions" />

        <card v-if="getSessions" class="card" title="Session Manager">
            <div class="row">
                <div class="col-md-5">
                    <fg-input type="text"
                        label="Session Label"
                        :disabled="true"
                        placeholder="loading, please wait..."
                        v-model="session.label"
                    ></fg-input>

                    <fg-input type="text"
                        label="Current Status"
                        :disabled="true"
                        placeholder="loading, please wait..."
                        v-model="session.status"
                    ></fg-input>

                    <fg-input type="text"
                        label="Current Shuffle Phase"
                        :disabled="true"
                        placeholder="loading, please wait..."
                        v-model="session.phase"
                    ></fg-input>
                </div>

                <div class="col-md-6 offset-md-1">
                    <p-button
                        v-if="!isShuffling"
                        block
                        type="info"
                        @click.native="startShuffle"
                    >
                        Start Shuffling
                    </p-button>

                    <p-button
                        v-if="isShuffling"
                        block
                        type="danger"
                        @click.native="stopShuffle"
                    >
                        Stop Shuffling
                    </p-button>

                    <div class="toggleFlag" @click="toggleAutoStart">
                        <h3>
                            <i v-if="autoStart" class="fa fa-check-square mr-2"></i>
                            <i v-else class="fa fa-square mr-2"></i>
                            Auto-start
                        </h3>
                    </div>

                    <p class="setting-tip">
                        Will automatically start shuffling when new coins are added to the session.
                    </p>

                    <hr>

                    <div class="toggleFlag" @click="toggleAutoReshuffle">
                        <h3>
                            <i v-if="autoReshuffle" class="fa fa-check-square mr-2"></i>
                            <i v-else class="fa fa-square mr-2"></i>
                            Auto-reshuffle
                        </h3>
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
        </card>

        <hr v-if="sessionCoins.data" />

        <card v-if="sessionCoins.data" class="card-plain" :title="sessionCoins.title" :subTitle="sessionCoins.subTitle">
            <div class="table-full-width table-responsive">
                <paper-table type="hover" :title="sessionCoins.title" :sub-title="sessionCoins.subTitle" :data="sessionCoins.data"
                    :columns="sessionCoins.columns">
                </paper-table>
            </div>
        </card>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'

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
        PaperTable,
    },
    data() {
        return {
            bitbox: null,
            nito: null,
            shuffleManager: null,
            isShuffling: false,

            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            },

            coins: [],
            session: {
                id: 0,
                label: 'My first session',
                status: null,
                phase: null,
                logs: [],
            },
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getActiveSessionId',
            'getCoinsBySession',
            'getDerivationPath',
            'getHDNode',
            'getNitoCashIdx',
            'getSessions',
        ]),

        sessionCoins() {
            return {
                title: 'Session Coins',
                subTitle: 'List of ALL coins added to this session.',
                columns: [...tableColumns],
                data: [...tableData],
            }
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
        },

        autoStart() {
            return false
        },

        autoReshuffle() {
            return false
        },

    },
    methods: {
        ...mapActions('purse', [
            'addSession',
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
         * Create Session
         */
        createSession() {
            // FOR DEVELOPMENT PURPOSES ONLY
            if (this.getSessions) {
                /* Set message. */
                const message = `Oops! Multiple sessions are not ready yet, but our team is working on it!`

                /* Display notification. */
                return this.$notify({
                    message,
                    icon: 'ti-alert', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'danger', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })
            }

            /* Add session. */
            this.addSession()

            /* Set message. */
            const message = `Nice! You've got a brand new session. Now it's time to fill it with coins.`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-info-alt', // ti-info-alt | ti-alert | ti-pin-alt
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'info', // info | danger | warning
                // timeout: 0, // 0: persistent | 5000: default
            })
        },

        /**
         * Toggle Auto-start
         */
        toggleAutoStart() {
            /* Set message. */
            const message = `Oops! Auto-start is not available yet, but our team is working on it!`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-alert', // ti-info-alt | ti-alert
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'danger', // info | danger
                // timeout: 0, // 0: persistent | 5000: default
            })
        },

        /**
         * Toggle Auto-reshuffle
         */
        toggleAutoReshuffle() {
            /* Set message. */
            const message = `Oops! Auto-reshuffle is not available yet, but our team is working on it!`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-alert', // ti-info-alt | ti-alert
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'danger', // info | danger
                // timeout: 0, // 0: persistent | 5000: default
            })
        },

        /**
         * Change (Account / Address)
         */
        change() {
            /* Set chain. */
            const chain = 1 // change account

            /* Set sessions. */
            const sessions = this.getSessions
            // console.log('TARGET (sessions):', sessions)

            /* Set accounts. */
            const accounts = sessions[this.getActiveSessionId].accounts
            // console.log('TARGET (accounts):', accounts)

            /* Set account index. */
            const acctIndex = accounts.change

            /* Set derivation path. */
            const path = this.getDerivationPath(
                this.getActiveSessionId, chain, acctIndex)
            console.log('MANAGER (change path)', path)

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
         * Target (Account / Address)
         */
        target() {
            /* Set chain. */
            const chain = 7867 // Nito Cash account

            /* Set sessions. */
            const sessions = this.getSessions
            // console.log('TARGET (sessions):', sessions)

            /* Set accounts. */
            // const accounts = sessions[this.getActiveSessionId].accounts
            // console.log('TARGET (accounts):', accounts)

            /* Set derivation path. */
            const path = this.getDerivationPath(0, chain, this.getNitoCashIdx)
            console.log('MANAGER (target path)', path)

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

        /**
         * Start Shuffle
         */
        startShuffle() {
            const coins = this.getCoinsBySession(this.getActiveSessionId)
            console.log('MANAGER (coins):', coins)

            if (coins) {
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

                /* Set message. */
                const message = `You have STARTED shuffling your coins.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-info-alt', // ti-info-alt | ti-alert | ti-pin-alt
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'info', // info | danger | warning
                    // timeout: 0, // 0: persistent | 5000: default
                })

                /* Set flag. */
                this.isShuffling = true

            } else {
                /* Set message. */
                const message = `Oops! You don't have any coins available to shuffle.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-alert', // ti-info-alt | ti-alert | ti-pin-alt
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'danger', // info | danger | warning
                    // timeout: 0, // 0: persistent | 5000: default
                })
            }
        },

        /**
         * Stop Shuffle
         */
        stopShuffle() {
            /* Set flag. */
            this.isShuffling = true

            /* Validate shuffle manager. */
            if (this.shuffleManager) {
                /* Stop shuffle. */
                this.shuffleManager.stop()
            }

            /* Set message. */
            const message = `You have STOPPED shuffling your coins.`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-info-alt', // ti-info-alt | ti-alert | ti-pin-alt
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'info', // info | danger | warning
                // timeout: 0, // 0: persistent | 5000: default
            })
        },
    },
    created: function () {
        /* Initialize BITBOX. */
        this.initBitbox()

        /* Set session status. */
        this.session.status = 'INACTIVE'

        /* Set session phase. */
        this.session.phase = 'INACTIVE'

        /* Retrieve coins. */
        this.coins = this.getCoinsBySession(this.getActiveSessionId)
        console.log('COINS', this.coins)

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
