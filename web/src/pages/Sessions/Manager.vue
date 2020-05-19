<template>
    <card class="card" title="Manager Details">
        <div>
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-5">
                        <fg-input type="text"
                            label="Company"
                            :disabled="true"
                            placeholder="Paper dashboard"
                            v-model="user.company"
                        ></fg-input>
                    </div>
                    <div class="col-md-3">
                        <fg-input type="text"
                            label="Username"
                            placeholder="Username"
                            v-model="user.username"
                        ></fg-input>
                    </div>
                    <div class="col-md-4">
                        <fg-input type="email"
                            label="Username"
                            placeholder="Email"
                            v-model="user.email"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <fg-input type="text"
                            label="First Name"
                            placeholder="First Name"
                            v-model="user.firstName"
                        ></fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            v-model="user.lastName"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                            label="Address"
                            placeholder="Home Address"
                            v-model="user.address"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                            label="City"
                            placeholder="City"
                            v-model="user.city"
                        ></fg-input>
                    </div>
                    <div class="col-md-4">
                        <fg-input type="text"
                            label="Country"
                            placeholder="Country"
                            v-model="user.country"
                        ></fg-input>
                    </div>
                    <div class="col-md-4">
                        <fg-input type="number"
                            label="Postal Code"
                            placeholder="ZIP Code"
                            v-model="user.postalCode"
                        ></fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>About Me</label>
                            <textarea rows="5" class="form-control border-input"
                                placeholder="Here can be your description"
                                v-model="user.aboutMe">
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

            user: {
                company: "Paper Dashboard",
                username: "michael23",
                email: "",
                firstName: "Chet",
                lastName: "Faker",
                address: "Melbourne, Australia",
                city: "Melbourne",
                postalCode: "",
                aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
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
