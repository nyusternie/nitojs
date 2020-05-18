<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <Deposit />

            <members-card>

            </members-card>
        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
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
                </div>

                <div class="col-md-8">
                    <p>
                        De quibusdam concursionibus. Nam enim graviterque, fore ad singulis, a tamen
                        officia coniunctione, vidisse efflorescere qui litteris. Summis eiusmod ne
                        arbitror.Ita an dolor officia. Vidisse culpa aliqua qui noster ab ut ne irure
                        ipsum quid, summis id pariatur do labore, ad incurreret ab doctrina.
                    </p>
                </div>
            </div>

            <hr />

            <edit-profile-form>

            </edit-profile-form>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Deposit from './Sessions/Deposit'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

import EditProfileForm from './UserProfile/EditProfileForm.vue'
import MembersCard from './UserProfile/MembersCard.vue'

export default {
    components: {
        Deposit,

        EditProfileForm,
        MembersCard
    },
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
            'initSession',
        ]),

        createSession() {
            this.initSession()

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
    },
}
</script>

<style scoped>
/*  */
</style>
