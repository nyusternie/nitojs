<template>
    <main>
        <card class="card" :title="txsTable.title" :subTitle="txsTable.subTitle">
            <div class="table-full-width table-responsive">
                <paper-table
                    type="hover"
                    :data="txsTable.data"
                    :columns="txsTable.columns"
                />
            </div>

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

        <card class="card-user" title="Sending Options">
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
                <h3><i class="fa fa-square mr-2"></i> xPub Keys</h3>
            </div>

            <p class="setting-tip">
                Send to "unused" addresses generated from extended public keys.
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

        txsTable() {
            const tableData = {
                title: 'My Coin Book',
                subTitle: 'List of ALL incoming and outgoing coin activity since app setup.',
                columns: ['Coin Label', 'Privacy', 'Value'],
                data: []
            }

            Object.keys(this.getSessions).forEach(sessionId => {
                console.log(sessionId, this.getSessions[sessionId])

                const session = this.getSessions[sessionId]

                const coinLabel = 'Fresh mint'

                const privacy = 'A+'

                const value = '200 bits | $0.3482'

                const sessionData = {
                    coinlabel: coinLabel,
                    privacy,
                    value,
                }

                tableData.data.push(sessionData)
            })
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
</style>
