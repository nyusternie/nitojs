import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        version: 1,
    },
    mutations: {
        SET_VERSION (state, payload) {
            state.version = payload
        },
    },
    actions: {
        //
    },
})
