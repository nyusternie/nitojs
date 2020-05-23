<template>
    <main>
        <card class="card" title="Purse Settings">
            <div>
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
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>About Me</label>
                                <textarea rows="5" class="form-control border-input"
                                    placeholder="Here can be your description"
                                    v-model="user.aboutMe">
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <p-button type="info"
                            round
                            @click.native.prevent="updateSettings"
                        >
                            Update Purse
                        </p-button>

                    </div>
                    <div class="clearfix"></div>
                </form>
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
import { mapActions } from 'vuex'

export default {
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
