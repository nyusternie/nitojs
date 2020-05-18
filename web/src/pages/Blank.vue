<template>
    <card title="Notifications" sub-title="Custom Vue notifications plugin">
        <div>
            <div class="row">
                <div class="col-md-6">
                    <h5>Notifications Style</h5>

                    <div class="alert alert-info">
                        <span>This is a plain notification</span>
                    </div>

                    <p-button round outline block @click.native="notifyVue('top', 'right')">Top Right</p-button>

                    <p-button round outline block @click.native="notifyVue('bottom', 'right')">Bottom Right</p-button>
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
import NotificationTemplate from './Notifications/NotificationTemplate'

export default {
    data() {
        return {
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            }
        };
    },
    methods: {
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
    }
}
</script>

<style scoped>
/*  */
</style>
