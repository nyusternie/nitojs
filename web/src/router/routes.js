import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue'

/* General View */
import NotFound from '@/pages/NotFoundPage.vue'

/* Dashboard */
import Dashboard from '@/pages/Dashboard.vue'

/* Coins Manager */
import CoinsManager from '@/pages/CoinsManager.vue'

/* Sessions */
import Sessions from '@/pages/Sessions.vue'

/* Statistics */
import Stats from '@/pages/Stats.vue'

/* History */
import History from '@/pages/History.vue'

/* Settings */
import Settings from '@/pages/Settings.vue'

/* Support Pages */
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

            /* Coins Manager */
            {
                path: 'coins',
                name: 'Coins Manager',
                component: CoinsManager
            },

            /* Sessions */
            {
                path: 'sessions',
                name: 'Sessions Manager',
                component: Sessions
            },

            /* Statistics */
            {
                path: 'stats',
                name: 'Charts & Statistics',
                component: Stats
            },

            /* History */
            {
                path: 'history',
                name: 'Transaction History',
                component: History
            },

            /* Settings */
            {
                path: 'settings',
                name: 'App Settings',
                component: Settings
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
