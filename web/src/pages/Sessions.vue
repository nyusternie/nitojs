<template>
    <card title="CashShuffle" sub-title="Create a NEW session and start mixing right away.">
        <div class="row">
            <div class="col-md-4">
                <p-button
                    round
                    outline
                    block
                    @click.native="createSession"
                >
                    Create a new session
                </p-button>

                <p-button
                    round
                    outline
                    block
                    @click.native="destroySession"
                >
                    Destroy your purse
                </p-button>
            </div>

            <div class="col-md-8">
                <p>
                    De quibusdam concursionibus. Nam enim graviterque, fore ad singulis, a tamen
                    officia coniunctione, vidisse efflorescere qui litteris. Summis eiusmod ne
                    arbitror.Ita an dolor officia. Vidisse culpa aliqua qui noster ab ut ne irure
                    ipsum quid, summis id pariatur do labore, ad incurreret ab doctrina. Export
                    praesentibus pariatur esse consequat an singulis arbitrantur in doctrina,
                    occaecat duis fore constias malis, consequat aut amet. Constias velit illum
                    eiusmod tempor, et aliqua offendit do quis cernantur te amet aute ab nam quem
                    nescius eruditionem.
                </p>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-md-6">
                <h5>Notifications Style</h5>
                <div class="alert alert-info">
                    <span>This is a plain notification</span>
                </div>
                <div class="alert alert-info">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span>This is a notification with close button.</span>
                </div>
                <div class="alert alert-info alert-with-icon" data-notify="container">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span data-notify="icon" class="ti-bell"></span>
                    <span data-notify="message">This is a notification with close button and icon.</span>
                </div>
                <div class="alert alert-info alert-with-icon" data-notify="container">
                    <button type="button" aria-hidden="true" class="close">×</button>
                    <span data-notify="icon" class="ti-pie-chart"></span>
                    <span data-notify="message">This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.</span>
                </div>
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
        <br>

        <div class="places-buttons">
            <div class="row d-flex justify-content-center">
                <div>
                    <h5>Notifications Places
                        <p class="category">Click to view notifications</p>
                    </h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('top', 'left')">Top Left</p-button>
                </div>
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('top', 'center')">Top Center</p-button>
                </div>
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('top', 'right')">Top Right</p-button>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('bottom', 'left')">Bottom Left</p-button>
                </div>
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('bottom', 'center')">Bottom Center</p-button>
                </div>
                <div class="col-md-3">
                    <p-button round outline block @click.native="notifyVue('bottom', 'right')">Bottom Right</p-button>
                </div>

            </div>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

export default {
    data() {
        return {
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            }
        };
    },
    computed: {
        ...mapGetters('purse', [
            // 'getReceivingAccounts',
        ]),
    },
    methods: {
        ...mapActions('purse', [
            'initPurse',
            'destroyPurse',
        ]),

        createSession() {
            this.initPurse()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
        },

        destroySession() {
            this.destroyPurse()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
        },

        notifyVue(verticalAlign, horizontalAlign, type=null, icon=null) {
            if (!type) {
                const color = Math.floor(Math.random() * 4 + 1)
                type = this.type[color]
            }

            if (!icon) {
                icon = 'ti-gift'
            }

            this.$notify({
                // component: NotificationTemplate,
                component: NewSession,
                icon,
                horizontalAlign,
                verticalAlign,
                type
            })
        }
    }
}
</script>

<style>
/*  */
</style>
