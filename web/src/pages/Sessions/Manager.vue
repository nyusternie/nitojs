<template>
    <card class="card" title="Session Manager">
        <div>
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Session Title"
                            :disabled="true"
                            placeholder="Title"
                            v-model="session.title"
                        ></fg-input>
                    </div>

                    <div class="col-md-3">
                        <fg-input type="text"
                            label="Username"
                            placeholder="Username"
                            v-model="session.username"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="email"
                            label="Username"
                            placeholder="Email"
                            v-model="session.email"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <fg-input type="text"
                            label="First Name"
                            placeholder="First Name"
                            v-model="session.firstName"
                        ></fg-input>
                    </div>

                    <div class="col-md-6">
                        <fg-input type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            v-model="session.lastName"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                            label="Address"
                            placeholder="Home Address"
                            v-model="session.address"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                            label="City"
                            placeholder="City"
                            v-model="session.city"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="text"
                            label="Country"
                            placeholder="Country"
                            v-model="session.country"
                        ></fg-input>
                    </div>

                    <div class="col-md-4">
                        <fg-input type="number"
                            label="Postal Code"
                            placeholder="ZIP Code"
                            v-model="session.postalCode"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Session Notes</label>

                            <textarea rows="5" class="form-control border-input"
                                placeholder="Add your session notes here"
                                v-model="session.notes">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <p-button type="info"
                        round
                        @click.native.prevent="updateProfile"
                    >
                        Update Profile
                    </p-button>
                </div>

                <div class="clearfix"></div>
            </form>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import NotificationTemplate from '@/pages/Notifications/NotificationTemplate'

export default {
    data() {
        return {
            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            },

            session: {
                title: 'Session #1',
                username: 'michael23',
                email: '',
                firstName: 'Chet',
                lastName: 'Faker',
                address: 'Melbourne, Australia',
                city: 'Melbourne',
                postalCode: '',
                notes: `We must accept finite disappointment, but hold on to infinite hope.`
            }
        }
    },
    computed: {
        ...mapGetters('purse', [
            // 'getAddress',
        ]),

    },
    methods: {
        ...mapActions('purse', [
            // 'initSession',
        ]),

        updateProfile() {
            alert('Your data: ' + JSON.stringify(this.user))
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
        //
    }
}
</script>

<style scoped>
.journal-row {
    border-bottom: 1pt solid rgba(180, 180, 180, 0.2);
    padding-bottom: 10px;
    margin-bottom: 10px;
}
</style>
