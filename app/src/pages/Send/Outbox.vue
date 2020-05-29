<template>
    <main>
        <div class="row">
            <div class="col-md-4">
                <p-button type="success"
                    round
                    block
                    @click.native="sendAll"
                >
                    Send Now
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    <strong>Need to re-combine shuffled coins?</strong>
                    Consider using the non-custodial <a href="https://nito.exchange" target="_blank"><strong class="text-primary">Nito Exchange</strong></a> to add CashFusion privacy to your next session.
                </p>
            </div>
        </div>

        <card class="card" title="My Coin Outbox">
            <paper-table class="table-responsive table-responsive-md"
                type="hover"
                :data="txsTable.data"
                :columns="txsTable.columns"
            />

            <form @submit.prevent>

                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Address label"
                            :disabled="true"
                            placeholder="loading..."
                            :value="displayAddress"
                        ></fg-input>
                    </div>

                    <div class="col-md-3">
                        <fg-input type="text"
                            label="Value"
                            placeholder="loading..."
                            v-model="output.satoshis"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="text"
                            label="Pct"
                            placeholder="Email"
                            v-model="user.email"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-9">
                        <fg-input type="text"
                            label="Target address"
                            placeholder="Enter your destination address"
                            v-model="output.address"
                        ></fg-input>
                    </div>

                    <div class="col-md-3 btn-add-address">
                        <p-button type="info"
                            block
                            @click.native.prevent="addAddress"
                        >
                            Add new
                        </p-button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <p-button type="info"
                            block
                            outline
                            @click.native.prevent="updateSettings"
                        >
                            Add next Nito address
                        </p-button>
                    </div>

                    <div class="col-md-6">
                        <p-button type="info"
                            block
                            outline
                            :disabled="true"
                            @click.native.prevent="updateSettings"
                        >
                            Add next xPub address
                        </p-button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Transaction Notes</label>
                            <textarea rows="5" class="form-control border-input"
                                placeholder="Place your private (encrypted) transaction notes here."
                                v-model="user.aboutMe">
                            </textarea>
                        </div>
                    </div>
                </div>

                <!-- <div class="text-center">
                    <p-button type="info" class="mx-3"
                        round
                        @click.native.prevent="updateSettings"
                    >
                        Add ALL Inputs
                    </p-button>

                    <p-button type="info" class="mx-3"
                        round
                        outline
                        @click.native.prevent="updateSettings"
                    >
                        Randomize Output
                    </p-button>

                </div> -->
                <div class="clearfix"></div>
            </form>

        </card>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'

import { PaperTable } from '@/components'

export default {
    components: {
        PaperTable
    },
    data() {
        return {
            output: {
                address: null,
                satoshis: null,
                targets: [],
            },

            user: {
                email: '',
                aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
            }
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getActiveSessionId',
            'getSessions',
        ]),

        displayAddress() {
            if (this.output.address) {
                const address = this.output.address

                if (address.indexOf('bitcoin') !== -1) {
                    return address.slice(12)
                } else {
                    return address
                }
            } else {
                return 'loading...'
            }
        },

        txsTable() {
            /* Set table data. */
            const tableData = {
                title: 'Deposits & Transfers',
                subTitle: 'List of ALL incoming and outgoing coin activity since app setup.',
                columns: ['Type', 'Tx Value', 'Session', 'Confirmations', 'Time'],
                data: []
            }

            /* Validate sessions. */
            if (this.getSessions) {
                Object.keys(this.getSessions).forEach(sessionId => {
                    console.log(sessionId, this.getSessions[sessionId])

                    const session = this.getSessions[sessionId]

                    const type = 'DEPOSIT'

                    const txvalue = '200 bits | $0.3482'

                    const sessionName = 'Session #1'

                    const confirmations = 318

                    const time = '2 days ago'

                    const sessionData = {
                        type,
                        txvalue,
                        session: sessionName,
                        confirmations,
                        time
                    }

                    tableData.data.push(sessionData)
                })
                
            }

            console.log('TABLE DATA:', tableData)
            return tableData
        },

    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'sendCrypto',
            'updateCoins',
        ]),

        addAddress() {
            // this.output.satoshis = 19395
            this.output.satoshis = (19395 - 270)
        },

        /**
         * Send ALL
         */
        sendAll() {
            // FOR DEVELOPMENT PURPOSES ONLY
            if (!this.output.address) {
                /* Set message. */
                const message = `Please enter a cash address.`

                /* Display notification. */
                return this.$notify({
                    message,
                    icon: 'ti-alert', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'danger', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })
            } else if (!this.output.satoshis) {
                /* Set message. */
                const message = `Please enter a transfer amount.`

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

            const sessions = this.getSessions
            console.log('OUTBOX (sessions):', sessions)

            Object.keys(sessions).forEach(sessionIdx => {
                /* Initialize session. */
                const session = sessions[sessionIdx]

                /* Initialize coins. */
                const coins = session.coins
                console.log('OUTBOX (coins)', coins)

                /* Validate coins. */
                if (coins) {
                    Object.keys(coins).forEach(async txid => {
                        /* Initialize coin. */
                        const coin = coins[txid]
                        console.log('OUTBOX (coin)', coin)

                        /* Add WIF. */
                        coin.wif = coin.privateKeyWif

                        /* Add satoshis. */
                        coin.satoshis = coin.amountSatoshis

                        const outs = [
                            {
                                receiver: this.output.address,
                                satoshis: this.output.satoshis,
                            }
                        ]

                        /* Set validation flag. */
                        const doValidation = false

                        if (coin.satoshis < 20000) {
                            const results = await Nito.sendCoin(coin, outs, doValidation)
                            console.log('SEND RESULTS', results)
                        } else {
                            console.error('SKIPPING COIN')
                        }

                    })

                }
            })
        },

        /**
         * Update Settings
         */
        updateSettings() {
            alert('Your data: ' + JSON.stringify(this.user))
        },
    }
}
</script>

<style scoped>
.btn-add-address {
    margin-top: 30px;
}
</style>
