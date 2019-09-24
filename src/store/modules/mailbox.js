import client from '@/_sxapi/'

const state = {
    revision: '',
    folders: []
}

const getters = {
}

const actions = {
    getFolders({ commit }) {
        client.folders.then(data => {
            commit('setRevision', data.revision);
            commit('setFolders', data.folders);
        }).catch(err => err)
    }
}

const mutations = {
    setRevision(state, revision) {
        state.revision = revision;
    },

    setFolders(state, folders) {
        state.folders = folders
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}