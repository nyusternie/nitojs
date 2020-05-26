<template>
    <card title="Page Not Found" sub-title="Custom Vue notifications plugin">
        <div>
            <p>
                Sorry, but the page that you are looking for is unavailable.
                <br />
                <router-link to="/">
                    Back Home
                </router-link>
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
