import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue'

/* Dashboard */
import Dashboard from '@/pages/Dashboard.vue'

/* Sessions */
import Sessions from '@/pages/Sessions.vue'

/* Pools */
import Pools from '@/pages/Pools.vue'

/* History */
import History from '@/pages/History.vue'

/* Settings */
import Settings from '@/pages/Settings.vue'

/* Settings */
import Send from '@/pages/Send.vue'

/* Support Pages */
import NotFound from '@/pages/404.vue'
import Blank from '@/pages/Blank.vue'
import Icons from '@/pages/Icons.vue'

const routes = [
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/dashboard',
        children: [
            /* Dashboard */
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },

            /* Sessions Manager */
            {
                path: 'sessions',
                name: 'Sessions Manager',
                component: Sessions
            },

            /* Pools */
            {
                path: 'pools',
                name: 'Pools View',
                component: Pools
            },

            /* Transaction History */
            {
                path: 'history',
                name: 'Transaction History',
                component: History
            },

            /* Settings */
            {
                path: 'settings',
                name: 'Settings',
                component: Settings
            },

            /* Send */
            {
                path: 'send',
                name: 'Send Coins',
                component: Send
            },

            /* FOR DEVELOPMENT PURPOSES ONLY */
            {
                path: 'blank',
                name: 'Blank Template',
                component: Blank
            },
            {
                path: 'icons',
                name: 'icons',
                component: Icons
            }
        ]
    },
    {
        path: '*', component: NotFound
    }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
