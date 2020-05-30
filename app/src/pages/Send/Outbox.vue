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
            <div
                class="row coinRow"
                v-for="coin of outboxTable.data"
                :key="coin.id"
            >
                <div class="col-8">
                    {{coin.txid.slice(0, 12)}} ... {{coin.txid.slice(-12)}}
                </div>

                <div class="col-4">
                    {{getFormattedValue(coin.satoshis).rounded}}
                    {{getFormattedValue(coin.satoshis).unit}}
                </div>
            </div>

            <!-- <div class="row mt-3">
                <div class="col-md-5">
                    <fg-input type="text"
                        label="Address Label"
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
                    ></fg-input>
                </div>
            </div> -->

            <div class="row">
                <div class="col-md-9">
                    <fg-input type="text"
                        label="Destination Address"
                        placeholder="Enter your destination address"
                        v-model="output.address"
                    ></fg-input>
                </div>

                <div class="col-md-3 btn-add-address">
                    <p-button type="info"
                        block
                        :disabled="true"
                        @click.native="addAddress"
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
                        @click.native.prevent="addNitoAddress"
                    >
                        Add next Nito address
                    </p-button>
                </div>

                <div class="col-md-6">
                    <p-button type="info"
                        block
                        outline
                        :disabled="true"
                        @click.native.prevent="addXPubAddress"
                    >
                        Add next xPub address
                    </p-button>
                </div>
            </div>

            <div class="form-group mt-3">
                <label>Transaction Notes</label>
                <textarea rows="5" class="form-control border-input"
                    placeholder="Enter your private (encrypted) transaction notes here."
                    v-model="output.notes">
                </textarea>
            </div>

        </card>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'

export default {
    components: {
        //
    },
    data() {
        return {
            output: {
                address: null,
                satoshis: null,
                // destinations: null,
                notes: null,
            },

        }
    },
    computed: {
        ...mapGetters('purse', [
            'getActiveSessionId',
            'getOutbox',
            'getSessions',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
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

        outboxTable() {
            /* Set table data. */
            const tableData = {
                title: 'Deposits & Transfers',
                subTitle: 'List of ALL incoming and outgoing coin activity since app setup.',
                columns: ['Type', 'Tx Value', 'Session', 'Confirmations', 'Time'],
                data: []
            }

            /* Validate sessions. */
            if (this.getOutbox) {
                Object.keys(this.getOutbox).forEach(_coinId => {
                    const coin = this.getOutbox[_coinId]
                    console.log('OUTBOX (coin)', coin)

                    tableData.data.push(coin)
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
            'updateOutbox',
        ]),

        addAddress() {
            // this.output.satoshis = 19395
            // this.output.satoshis = (19395 - 270)
        },

        /**
         * Send ALL
         */
        sendAll() {
            if (!this.getOutbox) {
                /* Set message. */
                const message = `Oops! You need to first add a coin to your outbox.`

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


            if (!this.output.address) {
                /* Set message. */
                const message = `Oops! You need to enter a destination address before sending coins.`

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

            const outbox = this.getOutbox
            console.log('OUTBOX (outbox):', outbox)

            Object.keys(outbox).forEach(async _coinId => {
                /* Initialize coin. */
                const coin = outbox[_coinId]

                /* Validate coin. */
                if (coin) {
                    /* Add WIF. */
                    coin.wif = coin.privateKeyWif

                    /* Add satoshis. */
                    coin.satoshis = coin.amountSatoshis

                    const outs = [
                        {
                            receiver: this.output.address,
                            satoshis: coin.satoshis - 270,
                        }
                    ]

                    /* Set validation flag. */
                    const doValidation = false

                    const results = await Nito.sendCoin(coin, outs, doValidation)
                    console.log('SEND RESULTS', results)

                    if (results) {
                        /* Update outbox. */
                        this.updateOutbox(null)

                        /* Set message. */
                        const message = `Your coins have been sent successfully!`

                        /* Display notification. */
                        this.$notify({
                            message,
                            icon: 'ti-info-alt', // ti-info-alt | ti-alert
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            type: 'info', // info | danger
                            // timeout: 0, // 0: persistent | 5000: default
                        })

                    } else {
                        /* Set message. */
                        const message = `Oops! Something went wrong and your coin(s) were NOT sent.`

                        /* Display notification. */
                        this.$notify({
                            message,
                            icon: 'ti-alert', // ti-info-alt | ti-alert
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            type: 'danger', // info | danger
                            // timeout: 0, // 0: persistent | 5000: default
                        })
                    }
                } else {
                    alert('Something went terribly wrong!')
                    throw new Error('Something went terribly wrong!')
                }
            })
        },

        /**
         * Add Nito (Cash) Address
         */
        addNitoAddress() {
            /* Set message. */
            const message = `Oops! This feature is not available yet, but our team is working on it!`

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
         * Add xPubKey Address
         */
        addXPubAddress() {
            /* Set message. */
            const message = `Oops! This feature is not available yet, but our team is working on it!`

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
    }
}
</script>

<style scoped>
.btn-add-address {
    margin-top: 30px;
}

.coinRow {
    padding: 10px;
    cursor: default;
}
.coinRow:hover {
    background-color: rgba(255, 0, 0, 0.2);
}
</style>
