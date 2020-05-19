<template>
    <card class="card-user">
        <div v-if="depositAddress" slot="image" v-html="qr" class="depositAddress">
            <!-- placeholder for QRCode -->
        </div>
        <div v-else slot="image">
            <img src="@/assets/img/qr-placeholder.jpg" alt="...">
        </div>

        <div>
            <div class="author">
                <!-- <img class="avatar border-white" src="@/assets/img/faces/face-2.jpg" alt="..."> -->

                <h4 class="title">
                    <br>
                    <a :href="explorerLink" target="_blank">
                        <small>{{shortAddr}}</small>
                    </a>
                </h4>
            </div>

            <p class="description text-center">
                Deposit coins to the address above
                <br />
                <small class="text-muted"><em>(address privacy is managed automatically)</em></small>
            </p>
        </div>

        <hr>

        <div class="text-center">
            <div class="row">
                <div class="col">
                    <h5>
                        2
                        <br>
                        <small>Coins</small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        0.1337
                        <br>
                        <small>BTC</small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        $33.42
                        <br>
                        <small>USD</small>
                    </h5>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import QRCode from 'qrcode'

import NotificationTemplate from '@/pages/Notifications/NotificationTemplate'

export default {
    data() {
        return {
            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            }
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getAddress',
        ]),

        shortAddr() {
            if (this.depositAddress) {
                return `${this.depositAddress.slice(12, 20)} ... ${this.depositAddress.slice(-8)}`
            } else {
                return ''
            }
        },

        explorerLink() {
            return `https://explorer.bitcoin.com/bch/address/${this.depositAddress}`
        },

        qr() {
            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 290,
                height: 290,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            /* Validate deposit address. */
            if (this.depositAddress) {
                QRCode.toString(this.depositAddress, params, (err, value) => {
                    if (err) {
                        return console.error('QR Code ERROR:', err)
                    }

                    /* Set (string) value. */
                    strValue = value
                })
            }

            /* Return (string) value. */
            return strValue
        },

    },
    methods: {
        ...mapActions('purse', [
            'initSession',
        ]),

        notifyVue(verticalAlign, horizontalAlign) {
            const color = Math.floor(Math.random() * 4 + 1)

            this.$notify({
                component: NotificationTemplate,
                icon: 'ti-gift',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.type[color]
            })
        }
    },
    created: function () {
        /* Add deposit address. */
        // this.depositAddress = 'bitcoincash:qq638hdce3q0pg370hfee7f7sgxkw6j46c9cw9sqer'

        // FOR DEVELOPMENT PURPOSES ONLY
        const sessionId = 0

        const address = this.getAddress(sessionId)
        console.log('DEPOSIT (address):', address)

    }
}
</script>

<style scoped>
.card-user .depositAddress {
    padding: 0 5px;
}

h4.title {
    padding-top: 15px;
}

h5 {
    font-size: 1.2em;
}
</style>
