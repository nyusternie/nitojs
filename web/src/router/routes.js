import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue'

/* General View */
import NotFound from '@/pages/NotFoundPage.vue'

import Dashboard from '@/pages/Dashboard.vue'
import CoinsManager from '@/pages/CoinsManager.vue'

/* Statistics */
import Stats from '@/pages/Stats.vue'

/* Support Pages */
import Notifications from '@/pages/Notifications.vue'
import Icons from '@/pages/Icons.vue'
import TableList from '@/pages/TableList.vue'

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

            /* Statistics */
            {
                path: 'stats',
                name: 'Statistics',
                component: Stats
            },

            /* FOR DEVELOPMENT PURPOSES ONLY */
            {
                path: 'notifications',
                name: 'notifications',
                component: Notifications
            },
            {
                path: 'icons',
                name: 'icons',
                component: Icons
            },
            {
                path: 'table-list',
                name: 'table-list',
                component: TableList
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
