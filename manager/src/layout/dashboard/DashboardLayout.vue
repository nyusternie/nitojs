<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <sidebar-link to="/dashboard" name="Dashboard" icon="ti-blackboard" />
                <sidebar-link to="/coins" name="Coins Manager" icon="ti-server" />
                <sidebar-link to="/cashshuffle" name="CashShuffle" icon="ti-control-shuffle" />
                <sidebar-link to="/history" name="History" icon="ti-time" />
                <sidebar-link to="/settings" name="Settings" icon="ti-panel" />
                <sidebar-link to="/stats" name="Statistics" icon="ti-bar-chart" />

                <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" />
                <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" />
            </template>

            <mobile-menu>
                <li class="nav-item">
                    <a class="nav-link">
                        <i class="ti-panel"></i>
                        <p>Stats</p>
                    </a>
                </li>

                <drop-down class="nav-item"
                    title="5 Notifications"
                    title-classes="nav-link"
                    icon="ti-bell"
                >
                    <a class="dropdown-item">Notification 1</a>
                    <a class="dropdown-item">Notification 2</a>
                    <a class="dropdown-item">Notification 3</a>
                    <a class="dropdown-item">Notification 4</a>
                    <a class="dropdown-item">Another notification</a>
                </drop-down>

                <li class="nav-item">
                    <a class="nav-link">
                        <i class="ti-settings"></i>
                        <p>Settings</p>
                    </a>
                </li>

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
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
            }
        }
    }
}
</script>

<style lang="scss">
//
</style>
