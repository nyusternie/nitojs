<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <sidebar-link to="/dashboard" name="Dashboard" icon="ti-blackboard" />
                <sidebar-link to="/sessions" name="Sessions" icon="ti-pulse" />
                <sidebar-link to="/history" name="History" icon="ti-time" />
                <sidebar-link to="/settings" name="Settings" icon="ti-panel" />
                <sidebar-link to="/stats" name="Statistics" icon="ti-bar-chart" />
            </template>

            <mobile-menu>
                <li class="nav-item">
                    <a class="nav-link" href="https://causes.cash/@BCHPlease/nito-exchange-443db3869688" target="_blank">
                        <i class="ti-heart"></i>
                        <p>Causes Cash</p>
                    </a>
                </li>

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

                <!-- <li class="nav-item">
                    <a class="nav-link">
                        <i class="ti-settings"></i>
                        <p>Settings</p>
                    </a>
                </li> -->

                <li class="divider"></li>
            </mobile-menu>
        </side-bar>

        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content @click.native="toggleSidebar">

            </dashboard-content>

            <content-footer></content-footer>
        </div>
    </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from './MobileMenu'

export default {
    components: {
        TopNavbar,
        ContentFooter,
        DashboardContent,
        MobileMenu
    },
    data: () => {
        return {
            alerts: [],
        }
    },
    computed: {
        displayAlerts() {
            return `${this.alerts.length} Alerts`
        }
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
            }
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

<style lang="scss">
//
</style>
