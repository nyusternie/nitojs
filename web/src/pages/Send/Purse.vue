<template>
    <main>
        <card class="card" title="Sending Outbox">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Company"
                            :disabled="true"
                            placeholder="Paper dashboard"
                            v-model="user.company"
                        ></fg-input>
                    </div>

                    <div class="col-md-3">
                        <fg-input type="text"
                            label="Username"
                            placeholder="Username"
                            v-model="user.username"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="email"
                            label="Username"
                            placeholder="Email"
                            v-model="user.email"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <p-button type="info"
                            block
                            @click.native.prevent="updateSettings"
                        >
                            Add new
                        </p-button>
                    </div>

                    <div class="col-md-4">
                        <p-button type="info"
                            block
                            outline
                            @click.native.prevent="updateSettings"
                        >
                            Add Nito
                        </p-button>
                    </div>

                    <div class="col-md-4">
                        <p-button type="info"
                            block
                            outline
                            disabled="true"
                            @click.native.prevent="updateSettings"
                        >
                            Add xPub
                        </p-button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Transaction Notes</label>
                            <textarea rows="5" class="form-control border-input"
                                placeholder="Here can be your description"
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

        <div class="row">
            <div class="col-md-4">
                <p-button type="success"
                    round
                    block
                    @click.native="resync"
                >
                    Send Now
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    <strong>Need to re-combine shuffled coins?</strong>
                    Consider using the trustless <a href="https://nito.exchange" target="_blank"><strong class="text-primary">Nito Exchange</strong></a> to add CashFusion anonymity to your next shuffle transaction.
                </p>
            </div>
        </div>

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
            user: {
                company: 'Paper Dashboard',
                username: 'michael23',
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

    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'updateCoins',
        ]),

        /**
         * Rebuild (Purse)
         */
        rebuild() {
            this.rebuildPurse()

            // this.notifyVue('top', 'right', 'success', 'ti-info-alt')
        },

        /**
         * Resync Purse
         */
        resync() {
            /* Update coins. */
            // FIXME: Why is this blocking the entire initial UI setup??
            this.updateCoins()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
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
/*  */
</style>
