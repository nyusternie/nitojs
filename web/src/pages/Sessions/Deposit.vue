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
                Deposit your coins to this address.
                <br />It will automagically generate a new address upon receipt.
            </p>
        </div>

        <hr>

        <div class="text-center">
            <div class="row">
                <div :class="getClasses(0)">
                    <h5>
                        12
                        <br>
                        <small>Files</small>
                    </h5>
                </div>

                <div :class="getClasses(1)">
                    <h5>
                        2GB
                        <br>
                        <small>Used</small>
                    </h5>
                </div>

                <div :class="getClasses(2)">
                    <h5>
                        $5.12
                        <br>
                        <small>Spent</small>
                    </h5>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
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
        };
    },
    computed: {
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
        getClasses(index) {
            const remainder = index % 3;

            if (remainder === 0) {
                return 'col-lg-3 offset-lg-1'
            } else if (remainder === 2) {
                return 'col-lg-4'
            } else {
                return 'col-lg-3'
            }
        },

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
</style>
