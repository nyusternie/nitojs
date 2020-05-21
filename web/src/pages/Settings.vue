<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <user-card>

            </user-card>
        </div>

        <div class="col-xl-8 col-lg-7 col-md-6">
            <div class="col-md-4">
                <p-button
                    round
                    outline
                    block
                    @click.native="createPurse"
                >
                    Create a NEW purse
                </p-button>

                <p-button
                    round
                    outline
                    block
                    @click.native="removePurse"
                >
                    Destroy your purse
                </p-button>
            </div>

            <edit-profile-form>

            </edit-profile-form>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

// import NotificationTemplate from './Notifications/NotificationTemplate'
import NewSession from './Notifications/NewSession'

import EditProfileForm from './UserProfile/EditProfileForm.vue'
import UserCard from './UserProfile/UserCard.vue'

export default {
    components: {
        EditProfileForm,
        UserCard,
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

        createPurse() {
            this.initPurse()

            this.notifyVue('top', 'right', 'success', 'ti-info-alt')
        },

        removePurse() {
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
    },
}
</script>

<style scoped>
/*  */
</style>
