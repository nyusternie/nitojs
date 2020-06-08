<template>
    <card class="card-user">
        <div v-if="depositAddress">
            <div class="depositAddress">
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

            <div class="author">
                <!-- <img class="avatar border-white" src="@/assets/img/faces/face-2.jpg" alt="..."> -->

                <h4 class="title">
                    <br>
                    <a :href="explorerLink" target="_blank">
                        <small>
                            {{shortAddress}}
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
        </div>

        <div v-else slot="image">
            <img src="@/assets/img/qr-placeholder.jpg" alt="...">
        </div>

    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import QRCode from 'qrcode'

export default {
    data() {
        return {
            bitbox: null,
            blockchain: null,

            // sessionId: null,

            balance: null,
            // coins: null,
        }
    },
    watch: {
        depositAddress: function (_address) {
            console.log('DEPOSIT ADDRESS HAS CHANGED, REGISTER IT!!', _address)

            /* Subscribe to address updates. */
            const watching = this.blockchain
                .subscribe('address', this.depositAddress)
            console.log('DEPOSIT (watching):', watching)

            /* Update the balance. */
            this.updateBalance()
        },
    },
    computed: {
        ...mapGetters('blockchain', [
            'getConn',
        ]),

        ...mapGetters('purse', [
            'getAddressBySessionId',
            'getActiveSessionId',
            'getBalanceBySessionId',
            'getCoinsBySessionId',
        ]),

        /**
         * Deposit Address
         *
         * Returns the next available receiving address.
         */
        depositAddress() {
            /* Set deposit address. */
            return this.getAddressBySessionId(this.getActiveSessionId)
        },

        coins() {
            /* Retreive session balance. */
            return this.getCoinsBySessionId(this.getActiveSessionId)
        },

        /**
         * Short Address
         *
         * Formats to a shortened version of the deposit address.
         */
        shortAddress() {
            if (this.depositAddress) {
                return `${this.depositAddress.slice(12, 20)} ... ${this.depositAddress.slice(-8)}`
            } else {
                return ''
            }
        },

        queryAddress() {
            if (this.depositAddress.includes('bitcoincash:')) {
                return this.depositAddress.slice(12)
            } else {
                return this.depositAddress
            }
        },

        explorerLink() {
            return `https://explorer.bitcoin.com/bch/address/${this.depositAddress}`
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
            let unit = 'BCH'

            /* Validate balance. */
            if (this.balance && this.balance.value) {
                /* Set value. */
                // value = this.balance.rounded
                value = this.balance.value

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
            let value = '$0.00'

            /* Initialize unit. */
            let unit = 'USD'

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
            'updateCoins',
        ]),

        /**
         * Initialize BITBOX
         */
        initBitbox() {
            console.info('Initializing BITBOX..')

            try {
                /* Initialize BITBOX. */
                // this.bitbox = new BITBOX()
                this.bitbox = new window.BITBOX()
            } catch (err) {
                console.error(err)
            }
        },

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.depositAddress) {
                /* Subscribe to address updates. */
                const watching = this.blockchain
                    .subscribe('address', this.depositAddress)
                console.log('DEPOSIT (watching):', watching)
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('DEPOSIT RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            /* Retreive session balance. */
            this.balance = await this
                .getBalanceBySessionId(this.getActiveSessionId, 'USD')
                .catch(err => console.error(err))
            console.log('DEPOSIT (balance):', this.balance)
        },

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

                /* Set message. */
                const message = `Your deposit address has been copied to your clipboard.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-info-alt', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'info', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
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
        /* Initialize BITBOX. */
        this.initBitbox()

        /* Initialize blockchain. */
        this.initBlockchain()

        /* Update balance. */
        this.updateBalance()
    },
    beforeDestroy() {
        /* Validate blockchain. */
        if (this.blockchain) {
            /* Stop blockchain. */
            this.blockchain.stop()
        }
    },
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
}
@media (min-width: 768px) {
    .card-user .depositAddress .qr {
        margin-left: -10px;
    }
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
