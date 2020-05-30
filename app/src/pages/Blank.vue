<template>
    <card title="Notifications" sub-title="Custom Vue notifications plugin">
        <div>
            <div class="row">
                <div class="col-md-6">
                    <h5>Notifications Style</h5>

                    <div class="alert alert-info">
                        <span>This is a plain notification</span>
                    </div>

                    <hr />

                    <p-button round outline block>Sample Button #1</p-button>

                    <p-button round block>Sample Button #2</p-button>
                </div>

                <div class="col-md-6">
                    <h5>Notification states</h5>

                    <div class="alert alert-info">
                        <button type="button" aria-hidden="true" class="close">×</button>
                        <span>
                            <b> Info - </b> This is a regular notification made with ".alert-info"
                        </span>
                    </div>

                    <div class="alert alert-success">
                        <button type="button" aria-hidden="true" class="close">×</button>
                        <span>
                            <b> Success - </b> This is a regular notification made with ".alert-success"
                        </span>
                    </div>

                    <div class="alert alert-warning">
                        <button type="button" aria-hidden="true" class="close">×</button>
                        <span>
                            <b> Warning - </b> This is a regular notification made with ".alert-warning"
                        </span>
                    </div>

                    <div class="alert alert-danger">
                        <button type="button" aria-hidden="true" class="close">×</button>
                        <span>
                            <b> Danger - </b> This is a regular notification made with ".alert-danger"
                        </span>
                    </div>
                </div>
            </div>

            <br>
            <hr />
            <br>

            <p>
                Tamen laboris laboris. Litteris e esse o aliquip te duis ex offendit nam culpa o
                se summis voluptate exquisitaque ex duis aliquip nescius ita litteris hic fugiat
                expetendis, senserit eruditionem ita eiusmod si sint vidisse ab occaecat. Ex
                labore hic anim ubi aute fabulas cernantur ad ita legam possumus officia et
                appellat an multos. Dolore an voluptate, officia iis quis laboris, quae arbitror
                ab relinqueret, elit expetendis a vidisse ad mandaremus e cupidatat te malis
                excepteur arbitrantur, quis sed te sunt arbitror, o incididunt comprehenderit.Et
                ne instituendarum. Vidisse dolore elit quo cillum. Dolor tractavissent pariatur
                tamen appellat. Fugiat id voluptate si consequat minim eiusmod, fugiat qui ubi
                quid nescius se esse domesticarum fabulas quae nescius.
            </p>

        </div>
    </card>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        /* Set message. */
        const message = `Hi there! Looks like you're setting up a new page. Good luck! 加油！`

        /* Display notification. */
        this.$notify({
            message,
            icon: 'ti-info-alt', // ti-info-alt | ti-alert | ti-pin-alt
            verticalAlign: 'top',
            horizontalAlign: 'right',
            type: 'info', // info | danger | warning
            // timeout: 0, // 0: persistent | 5000: default
        })
    },
}
</script>

<style scoped>
/*  */
</style>
