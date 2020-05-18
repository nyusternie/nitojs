/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import purse from './modules/purse'
import system from './modules/system'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Export store. */
export default new Vuex.Store({
    modules: {
        purse,
        system,
    },
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== 'production'
})
