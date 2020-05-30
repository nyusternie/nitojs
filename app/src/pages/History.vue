<template>
    <div class="row">
        <div class="col-12">
            <card :title="sessionsTable.title" :subTitle="sessionsTable.subTitle">
                <div slot="raw-content" class="table-responsive">
                    <paper-table
                        type="hover"
                        :data="sessionsTable.data"
                        :columns="sessionsTable.columns"
                    />
                </div>
            </card>
        </div>

        <div class="col-12">
            <card class="card-plain" :title="txsTable.title" :subTitle="txsTable.subTitle">
                <div class="table-full-width table-responsive">
                    <paper-table
                        type="hover"
                        :data="txsTable.data"
                        :columns="txsTable.columns"
                    />
                 </div>
            </card>
        </div>

        <div class="col-12">
            <card :title="sysTable.title" :subTitle="sysTable.subTitle">
                <div slot="raw-content" class="table-responsive">
                    <paper-table
                        :data="sysTable.data"
                        :columns="sysTable.columns"
                    />
                </div>
            </card>
        </div>

    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import { PaperTable } from '@/components'

export default {
    components: {
        PaperTable,
    },
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('purse', [
            //
        ]),

        sessionsTable() {
            const tableData = {
                title: 'Sessions',
                subTitle: 'List of ALL CashShuffle session activity since app setup.',
                columns: ['Id', 'Name', 'Current Value', 'Num Coins', 'Status'],
                data: []
            }

            Object.keys(this.getSessions).forEach(sessionId => {
                console.log(sessionId, this.getSessions[sessionId])

                const session = this.getSessions[sessionId]

                const id = parseInt(sessionId) + 1

                const name = 'Session #1'

                const currentvalue = '$36.7381'

                const numcoins = Object.keys(session.coins).length

                const status = 'ACTIVE'

                const sessionData = {
                    id,
                    name,
                    currentvalue,
                    numcoins,
                    status
                }

                tableData.data.push(sessionData)
            })
            console.log('TABLE DATA:', tableData)
            return tableData
        },

        txsTable() {
            const tableData = {
                title: 'Deposits & Transfers',
                subTitle: 'List of ALL incoming and outgoing coin activity since app setup.',
                columns: ['Type', 'Tx Value', 'Session', 'Confirmations', 'Time'],
                data: []
            }

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
            console.log('TABLE DATA:', tableData)
            return tableData
        },

        sysTable() {
            const tableData = {
                title: 'Application',
                subTitle: 'List of ALL application activity since app setup.',
                columns: ['Action', 'Tx Value', 'Session', 'Confirmations', 'Time'],
                data: []
            }

            Object.keys(this.getSessions).forEach(sessionId => {
                console.log(sessionId, this.getSessions[sessionId])

                const session = this.getSessions[sessionId]

                const action = 'CREATED PURSE'

                const txvalue = '200 bits | $0.3482'

                const sessionName = 'Session #1'

                const confirmations = 318

                const time = '2 days ago'

                const sessionData = {
                    action,
                    txvalue,
                    session: sessionName,
                    confirmations,
                    time
                }

                tableData.data.push(sessionData)
            })
            console.log('TABLE DATA:', tableData)
            return tableData
        },

    },
    methods: {
        ...mapActions('purse', [
            //
        ]),

    },
    created: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
