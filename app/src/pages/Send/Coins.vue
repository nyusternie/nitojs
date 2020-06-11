<template>
    <main>
        <card class="card" :title="coinsTable.title" :subTitle="coinsTable.subTitle">
            <div
                class="row coinRow"
                v-for="coin of coinsTable.data"
                :key="coin.id"
                @click="addToOutbox(coin)"
            >
                <div class="col-1">
                    {{coin.status}}
                </div>

                <div class="col-7">
                    {{coin.label}}
                </div>

                <div class="col-4">
                    {{getFormattedValue(coin.value).rounded}}
                    {{getFormattedValue(coin.value).unit}}
                </div>
            </div>

            <!-- <paper-table class="table-responsive table-responsive-md"
                type="hover"
                :data="coinsTable.data"
                :columns="coinsTable.columns"
            /> -->

            <div class="row mt-3">
                <div class="col-6">
                    <p-button type="info"
                        block
                        @click.native.prevent="addAllCoins"
                    >
                        Add ALL
                    </p-button>
                </div>
                <div class="col-6">
                    <p-button type="danger"
                        block
                        outline
                        @click.native.prevent="removeAllCoins"
                    >
                        Remove ALL
                    </p-button>
                </div>
            </div>
        </card>

        <hr />

        <card class="card-user" title="Address Options">
            <small>
                For your convenience, addresses can be automatically loaded into your outbox,
                based on their use and availability.
            </small>

            <div class="toggleFlag" @click="toggleNitoCash">
                <h3>
                    <i v-if="nitoCash" class="fa fa-check-square mr-2"></i>
                    <i v-else class="fa fa-square mr-2"></i>
                    Nito Cash
                </h3>
            </div>

            <p class="setting-tip">
                Send to "unused"  addresses generated from a Nito privacy-enabled wallet.
            </p>

            <hr>

            <div class="toggleFlag" @click="toggleXPubKey">
                <h3>
                    <i v-if="xPubKey" class="fa fa-check-square mr-2"></i>
                    <i v-else class="fa fa-square mr-2"></i>
                    xPub Key
                </h3>
            </div>

            <p class="setting-tip">
                Send to "unused" addresses generated from an extended public key.
            </p>
        </card>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        //
    },
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getCoinById',
            'getOutbox',
            'getSessions',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        /**
         * Coins Table
         */
        coinsTable() {
            /* Set table data. */
            const tableData = {
                title: 'My Unspent Coins',
                subTitle: 'All Sessions : Confirmed & Unconfirmed',
                columns: ['Label', 'Status', 'Value'],
                data: []
            }

            /* Validate sessions. */
            if (this.getSessions) {
                Object.keys(this.getSessions).forEach(sessionId => {
                    /* Initialize sessions. */
                    const sessions = this.getSessions
                    console.log('COINS (sessions):', sessions)

                    Object.keys(sessions).forEach(sessionIdx => {
                        /* Initialize session. */
                        const session = sessions[sessionIdx]

                        /* Initialize coins. */
                        const coins = session.coins
                        // console.log('COINS (coins):', coins)

                        Object.keys(coins).forEach(async coinId => {
                            /* Initialize coin. */
                            const coin = coins[coinId]
                            // console.log('COINS (coin):', coin)

                            /* Set id. */
                            const id = `${coin.txid}:${coin.vout}`

                            /* Set label. */
                            const label = `${coin.txid.slice(0, 8)} ... ${coin.txid.slice(-8)} : ${coin.vout}`

                            /* Set status. */
                            // TODO: Will probably develop a rating scale??
                            const status = coin.status === 'active' ? '✓' : 'ⅹ'

                            /* Set value. */
                            const value = coin.satoshis

                            /* Build coin data. */
                            const coinData = {
                                id,
                                label,
                                status,
                                value,
                            }

                            // TODO: Allow display of spent coins.
                            if (status === '✓') {
                                tableData.data.push(coinData)
                            }

                        })

                    })

                })

            }

            // console.log('TABLE DATA:', tableData)
            return tableData
        },

        /**
         * Nito Cash
         */
        nitoCash() {
            return true
        },

        /**
         * Extended Public Key
         */
        xPubKey() {
            return false
        },

    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'updateCoins',
            'updateOutbox',
        ]),

        /**
         * Add To Outbox
         */
        addToOutbox(_coin) {
            console.log('COIN ID', _coin.id)

            /* Retrieve outbox. */
            let outbox = this.getOutbox
            console.log('OUTBOX', outbox)

            /* Validate outbox. */
            if (!outbox) {
                /* Initialize outbox. */
                outbox = {}
            }

            /* Retrieve coin details. */
            const coin = this.getCoinById(_coin.id)
            // console.log('FOUND COIN', coin)

            /* Set label. */
            const label = `${coin.txid.slice(0, 8)} ... ${coin.txid.slice(-8)} : ${coin.vout}`

            if (_coin.status !== '✓') {
                /* Set message. */
                const message = `${label} has already been spent.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-alert', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'danger', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })
            } else if (outbox[_coin.id]) {
                /* Set message. */
                const message = `${label} has already been added to your outbox.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-alert', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'danger', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })
            } else {
                /* Add coin to outbox. */
                outbox[_coin.id] = coin

                /* Update outbox. */
                this.updateOutbox(outbox)

                /* Set message. */
                const message = `${label}  has been ADDED to your outbox.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-info-alt', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'info', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })
            }

        },

        /**
         * Add All Coins
         */
        addAllCoins() {
            /* Loop through listed coins. */
            this.coinsTable.data.forEach(coin => {
                this.addToOutbox(coin)
            })
        },

        removeAllCoins() {
            /* Update outbox. */
            this.updateOutbox(null)

            /* Set message. */
            const message = `All coins have been REMOVED from your outbox.`

            /* Display notification. */
            this.$notify({
                message,
                icon: 'ti-info-alt', // ti-info-alt | ti-alert
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'info', // info | danger
                // timeout: 0, // 0: persistent | 5000: default
            })
        },

        /**
         * Toggle Nito Cash
         */
        toggleNitoCash() {
            /* Set message. */
            const message = `Oops! Nito Cash is currently the only wallet type and cannot be disabled.`

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
         * Toggle Extended Public Key
         */
        toggleXPubKey() {
            /* Set message. */
            const message = `Oops! xPub Key is not available yet, but our team is working on it!`

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
.setting-tip {
    margin-left: 40px;
    font-size: 0.9em;
}

.card-user small {
    font-size: 0.9em;
    color: rgba(90, 90, 90, 0.8);
}

.coinRow {
    padding: 10px;
    cursor: pointer;
}
.coinRow:hover {
    background-color: rgba(255, 0, 0, 0.2);
}
</style>
