
let counter = 0;
const state = {
    notifications: [],
}

const getters = {
    notifications: state => state.notifications
}

const actions = {
    addError({commit}, msg) {
        commit('addNotification', {'title': 'Error', 'message': msg, 'variant': 'danger'})
    },
    addInfo({commit}, msg) {
        commit('addNotification', {'title': 'Information', 'message': msg, 'variant': 'info'})
    },
    addSuccess({commit}, msg) {
        commit('addNotification', {'title': 'Success', 'message': msg, 'variant': 'success'})
    },
    addWarning({commit}, msg) {
        commit('addNotification', {'title': 'Warning', 'message': msg, 'variant': 'warning'})
    },
    removeNotification({commit}, id) {
        commit('removeNotification', id)
    }
}

const mutations = {
    addNotification(state, item) {
        state.notifications.push({...item, ...{id:`notif-${counter++}`}});
    },
    removeNotification(state, id) {
        try {
            delete state.notifications[id];
        } catch (e) {
            console.log(e)
            ////passs
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}