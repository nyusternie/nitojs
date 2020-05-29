<template>
    <main>
        <card class="card" :title="coinsTable.title" :subTitle="coinsTable.subTitle">
            <paper-table class="table-responsive table-responsive-md"
                type="hover"
                :data="coinsTable.data"
                :columns="coinsTable.columns"
            />

            <div class="row">
                <div class="col-6">
                    <p-button type="info"
                        block
                        @click.native.prevent="updateSettings"
                    >
                        Add ALL
                    </p-button>
                </div>
                <div class="col-6">
                    <p-button type="danger"
                        block
                        outline
                        @click.native.prevent="updateSettings"
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
            <!-- <div slot="image">
                <img src="@/assets/img/background.jpg" alt="...">
            </div> -->

            <div>
                <h3><i class="fa fa-check-square mr-2"></i> Nito Cash</h3>
            </div>

            <p class="setting-tip">
                Send to "unused"  addresses generated from a Nito privacy-enabled wallet.
            </p>

            <hr>

            <div>
                <h3><i class="fa fa-square mr-2"></i> xPub Key</h3>
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

import { PaperTable } from '@/components'

export default {
    components: {
        PaperTable
    },
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getActiveSessionId',
            'getSessions',
        ]),

        coinsTable() {
            /* Set table data. */
            const tableData = {
                title: 'My Unspent Coins',
                subTitle: 'All Sessions : Confirmed & Unconfirmed',
                columns: ['Coin Label', 'Status', 'Value'],
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
                        console.log('COINS (coins):', coins)

                        Object.keys(coins).forEach(async txid => {
                            /* Initialize coin. */
                            const coin = coins[txid]
                            console.log('COINS (coin):', coin)

                            // const coinLabel = 'Fresh mint'
                            const coinLabel = `${coin.txid.slice(0, 8)}:${coin.vout}`

                            const status = coin.status

                            // const value = '200 bits | $0.3482'
                            const value = coin.amountSatoshis

                            const sessionData = {
                                coinlabel: coinLabel,
                                status,
                                value,
                            }

                            tableData.data.push(sessionData)

                        })

                    })

                })

            }

            console.log('TABLE DATA:', tableData)
            return tableData
        },

    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'updateCoins',
        ]),

        //
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
</style>
