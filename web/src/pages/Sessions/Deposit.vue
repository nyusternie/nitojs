<template>
    <card class="card-user">
        <div v-if="depositAccount" class="depositAccount">
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
                            {{shortAccount}}
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
                        {{numCoins}}
                        <br>
                        <small>Coins</small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        {{crypto.value}}
                        <br>
                        <small class="text-uppercase">
                            {{crypto.unit}}
                        </small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        {{fiat.value}}
                        <br>
                        <small>{{fiat.unit}}</small>
                    </h5>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import { BITBOX } from 'bitbox-sdk'

/* Import components. */
import QRCode from 'qrcode'

import CopiedToClipboard from '@/pages/Notifications/CopiedToClipboard'

export default {
    data() {
        return {
            bitbox: null,

            balance: null,
            coins: null,
            depositAccount: null,
        }
    },
    computed: {
        ...mapGetters('blockchain', [
            'getConn',
        ]),

        ...mapGetters('purse', [
            'getAccountBySession',
            'getBalanceBySession',
            'getCoinsBySession',
        ]),

        shortAccount() {
            if (this.depositAccount) {
                return `${this.depositAccount.slice(12, 20)} ... ${this.depositAccount.slice(-8)}`
            } else {
                return ''
            }
        },

        queryAccount() {
            if (this.depositAccount.includes('bitcoincash:')) {
                return this.depositAccount.slice(12)
            } else {
                return this.depositAccount
            }
        },

        explorerLink() {
            return `https://explorer.bitcoin.com/bch/address/${this.depositAccount}`
        },

        numCoins() {
            if (this.coins) {
                return Object.keys(this.coins).length
            } else {
                return 0
            }
        },

        crypto() {
            /* Initialize value. */
            let value = 0

            /* Initialize unit. */
            let unit = ''

            /* Validate balance. */
            if (this.balance && this.balance.value) {
                /* Set value. */
                value = this.balance.rounded

                /* Set unit. */
                unit = this.balance.unit
            }

            /* Return fiat. */
            return {
                value,
                unit
            }
        },

        fiat() {
            /* Initialize value. */
            let value = 0

            /* Initialize unit. */
            let unit = ''

            /* Validate balance. */
            if (this.balance && this.balance.fiat) {
                /* Set value. */
                value = this.balance.fiat.split(' ')[0]

                /* Set unit. */
                unit = this.balance.fiat.split(' ')[1]
            }

            /* Return fiat. */
            return {
                value,
                unit
            }
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
            if (this.depositAccount) {
                QRCode.toString(this.depositAccount, params, (err, value) => {
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
         * Initialize BITBOX
         */
        initBitbox() {
            console.info('Initializing BITBOX..')

            try {
                /* Initialize BITBOX. */
                this.bitbox = new BITBOX()
            } catch (err) {
                console.error(err)
            }
        },

        async watchForDeposit() {
            const query = {
                v: 3,
                q: {
                    find: {
                        'in.e.a': this.queryAccount,
                        'out.e.a': this.queryAccount,
                        // 'in.e.a': 'qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk',
                        // 'out.e.a': 'qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk'
                    },
                    limit: 10
                }
            }
            console.log('Watch query:', query)

            const res = await this.bitbox.BitDB.get(query)
            console.log('Watch result:', JSON.stringify(res, null, 4))

        },

        /**
         * Set Clipboard
         */
        setClipboard() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = this.depositAccount
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
    created: async function () {
        /* Initialize BITBOX. */
        this.initBitbox()

        /* Initialize connection. */
        // NOTE: Open socket connection to the blockchain.
        // this.openConn()

        // FOR DEVELOPMENT PURPOSES ONLY
        const sessionId = 0

        /* Set deposit address. */
        this.depositAccount = this.getAccountBySession(sessionId)
        // console.log('DEPOSIT (address):', this.depositAccount)

        /* Retreive session balance. */
        this.balance = await this.getBalanceBySession(sessionId, 'USD')
        // console.log('DEPOSIT (balance):', this.balance)

        /* Retreive session balance. */
        this.coins = await this.getCoinsBySession(sessionId)
        // console.log('DEPOSIT (coins):', this.coins)

        // this.watchForDeposit()

    },
    beforeDestroy() {
        /* Wait 60 seconds, then close the real-time blockchain connection. */
        // setTimeout(() => {
            // this.closeConn()
        // }, 60000)
    }
}
</script>

<style scoped>
.card-user .depositAccount {
    /* padding: 0 5px; */
    /* border: 1pt solid red; */
    cursor: pointer;
    text-align: center;
}
.card-user .depositAccount .qr {
    margin-top: -15px;
    margin-left: -10px;
}
.card-user .depositAccount .clipboard-note {
    margin-top: -15px;
    color: rgba(255, 90, 90, 0.5);
}
.card-user .depositAccount .clipboard-note:hover {
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
