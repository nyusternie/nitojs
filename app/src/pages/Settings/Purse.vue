<template>
    <main>
        <card class="card" title="Purse Settings">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <fg-input type="text"
                        label="Label"
                        :disabled="true"
                        :value="label"
                    ></fg-input>
                </div>

                <div class="col-12 col-sm-6">
                    <fg-input type="text"
                        label="Created"
                        :disabled="true"
                        :value="createdAt"
                    ></fg-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Master Seed Phrase</label>
                        <small class="text-muted ml-2">(24 words)</small>

                        <textarea
                            rows="3"
                            class="form-control border-input"
                            :disabled="true"
                            :value="getMnemonic">
                        </textarea>
                    </div>
                </div>
            </div>

        </card>

        <hr />

        <div class="row">
            <div class="col-md-4">
                <p-button type="danger"
                    round
                    outline
                    block
                    @click.native="resync"
                >
                    Re-sync My Purse
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    <strong>Are you missing coins?</strong>
                    If you ever become out-of-sync with the network,
                    this will perform a 100% refresh from the latest blockchain.
                </p>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-md-4">
                <p-button type="danger"
                    round
                    block
                    @click.native="rebuild"
                >
                    Re-build My Purse
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    <strong>!!WARNING: THIS WILL DESTROY ALL PURSE DATA!!</strong>
                    Only comlete this action if you wish to destroy 100% of your coin data and start over with a fresh purse.
                </p>
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'

export default {
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getMeta',
            'getMnemonic',
        ]),

        label() {
            return this.getMeta.label
        },

        createdAt() {
            return moment.unix(this.getMeta.createdAt).format('LLLL')
        },
    },
    methods: {
        ...mapActions('purse', [
            'rebuildPurse',
            'updateCoins',
            'updateMeta',
        ]),

        /**
         * Rebuild (Purse)
         */
        rebuild() {
            this.rebuildPurse()

            /* Set message. */
            const message = `Your purse has been successfully rebuilt. It's time to fill it with coins!`

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
         * Resync Purse
         */
        async resync() {
            /* Update coins. */
            // FIXME: Why is this blocking the entire initial UI setup??
            await this.updateCoins()

            /* Set message. */
            const message = `Your purse has been successfully re-synced. It's time to go shuffle!`

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
         * Update Settings
         */
        updateSettings() {
            alert('Your data: ' + JSON.stringify(this.user))
        },
    },
    created: function () {
        const meta = this.getMeta
        console.log('METADATA', meta)
    },
}
</script>

<style scoped>
/*  */
</style>
