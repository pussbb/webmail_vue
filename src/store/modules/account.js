

import client from '@/_sxapi/'
import {isNull} from "bootstrap-vue/esm/utils/inspect";


const state = {
    status: 'idle',
    user: null
}

const getters = {
    isLoggedIn: state => !isNull(state.user),
    authStatus: state => state.status,
    userInfo: state => state.user,
    apiClient: () => client
}

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('auth_request')

        client.login(username, password)
            .then(
                user => {
                    commit('auth_success', user);
                }
            ).catch( err => {
                commit('auth_error');
                dispatch('notification/addError', err, { root: true })
                //throw err;
            });
    },

    logout({commit}) {
        commit('logout')
        client.logout()
    }

}

const mutations = {
    auth_request(state){
        state.status = 'loading';
    },

    auth_success(state, user){
        state.status = 'success';
        state.user = user;
    },

    auth_error(state){
        state.user = null;
        state.status = 'error';
    },

    logout(state){
        state.status = ''
        state.user = null
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}