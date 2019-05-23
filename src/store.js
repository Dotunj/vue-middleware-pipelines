import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: {
            loggedIn: true,
            isSubscribed: true
        }
    },

    getters: {
        auth(state) {
            return state.user
        }
    }
})
