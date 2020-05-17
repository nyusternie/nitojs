/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import coins from './modules/coins'
import system from './modules/system'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Export store. */
export default new Vuex.Store({
    modules: {
        coins,
        system,
    },
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== 'production'
})
