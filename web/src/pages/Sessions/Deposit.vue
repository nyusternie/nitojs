<template>
    <card class="card-user">
        <div v-if="depositAddress" class="depositAddress">
            <div
                slot="image"
                v-html="qr"
                class="qr"
                @click="setClipboard"
            >
                <!-- placeholder for QRCode -->
            </div>

            <div class="clipboard-note" @click="setClipboard">
                click to copy to your clipboard
            </div>
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
                        <small>
                            {{shortAddr}}
                            <i class="fa fa-external-link ml-1"></i>
                        </small>
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

import CopiedToClipboard from '@/pages/Notifications/CopiedToClipboard'

export default {
    data() {
        return {
            depositAddress: null,
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
        ...mapActions('blockchain', [
            'closeConn',
            'openConn',
        ]),

        /**
         * Set Clipboard
         */
        setClipboard() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = this.depositAddress
                document.body.appendChild(textArea)

                if (navigator.userAgent.match(/ipad|iphone/i)) {
                    const range = document.createRange()
                    range.selectNodeContents(textArea)

                    const selection = window.getSelection()
                    selection.removeAllRanges()
                    selection.addRange(range)

                    textArea.setSelectionRange(0, 999999)
                } else {
                    textArea.select()
                }

                document.execCommand('copy')
                document.body.removeChild(textArea)

                this.$notify({
                    component: CopiedToClipboard,
                    icon: 'ti-info-alt',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'success'
                })

                return true
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },
    },
    created: function () {
        /* Initialize connection. */
        // NOTE: Open socket connection to the blockchain.
        // this.openConn()

        // FOR DEVELOPMENT PURPOSES ONLY
        const sessionId = 0

        const address = this.getAddress(sessionId)
        // console.log('DEPOSIT (address):', address)

        /* Set deposit address. */
        this.depositAddress = address

    },
    beforeDestroy() {
        /* Wait 60 seconds, then close the real-time blockchain connection. */
        // setTimeout(() => {
            this.closeConn()
        // }, 60000)
    }
}
</script>

<style scoped>
.card-user .depositAddress {
    /* padding: 0 5px; */
    /* border: 1pt solid red; */
    cursor: pointer;
    text-align: center;
}
.card-user .depositAddress .qr {
    margin-top: -15px;
    margin-left: -10px;
}
.card-user .depositAddress .clipboard-note {
    margin-top: -15px;
    color: rgba(255, 90, 90, 0.5);
}
.card-user .depositAddress .clipboard-note:hover {
    margin-top: -15px;
    color: rgba(255, 90, 90, 1.0);
}

h4.title {
    padding-top: 15px;
}

h5 {
    font-size: 1.2em;
}
</style>
