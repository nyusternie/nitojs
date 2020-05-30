<template>
    <card class="card-user" title="App Settings">
        <div slot="image">
            <img src="@/assets/img/background.jpg" alt="...">
        </div>

        <div class="toggleFlag" @click="toggleUnconfirmed">
            <h3>
                <i v-if="getFlags.unconfirmed" class="fa fa-check-square mr-2"></i>
                <i v-else class="fa fa-square mr-2"></i>
                Unconfirmed Txs
            </h3>
        </div>

        <p class="setting-tip">
            Instantly display your FULL balance, before coins are confirmed in a block.
        </p>

        <hr>

        <div class="toggleFlag" @click="toggleDarkMode">
            <h3>
                <i v-if="getFlags.darkMode" class="fa fa-check-square mr-2"></i>
                <i v-else class="fa fa-square mr-2"></i>
                Dark Mode
            </h3>
        </div>

        <p class="setting-tip">
            Adapts the fore/back-ground themes for reduced stress on the eyes.
        </p>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters([
            'getFlags',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            'setFlags',
        ]),

        toggleDarkMode() {
            /* Set message. */
            const message = `Oops! Dark mode is not available yet, but our team is working on it!`

            /* Display notification. */
            return this.$notify({
                message,
                icon: 'ti-alert', // ti-info-alt | ti-alert
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'danger', // info | danger
                // timeout: 0, // 0: persistent | 5000: default
            })

            /* Retrieve flags. */
            const flags = this.getFlags

            /* Flip flag. */
            flags.darkMode = !flags.darkMode

            /* Reset flags. */
            this.setFlags(flags)
        },

        toggleUnconfirmed() {
            /* Retrieve flags. */
            const flags = this.getFlags

            /* Flip flag. */
            flags.unconfirmed = !flags.unconfirmed

            /* Reset flags. */
            this.setFlags(flags)

            /* Initialize status. */
            let status = null

            if (flags.unconfirmed) {
                status = 'ENABLED'
            } else {
                status = 'DISABLED'
            }

            /* Set message. */
            const message = `Unconfirmed transactions have been ${status} in your purse.`

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
    },
    created: function () {
        /* Retrieve flags. */
        console.log('SETTINGS / APP (flags):', this.getFlags)
    },
}
</script>

<style scoped>
.setting-tip {
    margin-left: 40px;
    font-size: 0.9em;
}
</style>
