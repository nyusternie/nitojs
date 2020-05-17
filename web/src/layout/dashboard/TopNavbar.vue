<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">{{routeName}}</a>

            <button class="navbar-toggler navbar-burger"
                type="button"
                @click="toggleSidebar"
                :aria-expanded="$sidebar.showSidebar"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
            </button>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <drop-down class="nav-item"
                        :title="displayAlerts"
                        title-classes="nav-link"
                        icon="ti-bell"
                    >
                        <a
                            class="dropdown-item"
                            href="javascript://"
                            v-for="alert of alerts"
                            :key="alert.id"
                        >
                            {{alert.title}}
                        </a>
                    </drop-down>

                    <li class="nav-item">
                        <a class="nav-link" href="https://causes.cash/@BCHPlease/nito-exchange-443db3869688" target="_blank">
                            Learn how your <i class="ti-heart ml-2 text-danger"></i> and support <strong class="text-danger">Causes Cash</strong>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        routeName() {
            const { name } = this.$route
            return this.capitalizeFirstLetter(name)
        },

        displayAlerts() {
            return `${this.alerts.length} Alerts`
        }
    },
    data() {
        return {
            activeNotifications: false,
            alerts: [],
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications
        },
        closeDropDown() {
            this.activeNotifications = false
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false)
        }
    },
    created: function () {
        /* Add alert. */
        this.alerts.push({
            id: '8542cd38-91ed-4315-9941-88c660213f8c',
            title: 'CashShuffle completed',
            createdAt: 123,
        })

        /* Add alert. */
        this.alerts.push({
            id: '894edd53-5b2a-4672-a42c-b9759bd32857',
            title: 'Deposit received',
            createdAt: 456,
        })

    },
}
</script>

<style>
/*  */
</style>
