import client from '@/_sxapi/'

const state = {
    revision: '',
    folders: [],
    currentFolder: null
}


const getters = {
    currentFolderDref: state => state.currentFolder ? state.currentFolder.directRef : null,

    findFolder: state => folderDref => {
        let findByDref = function(arr) {
            for (let folder of arr) {
                if (folder.directRef === folderDref) {
                    return folder;
                }
                let res = findByDref(folder.subFolders);
                if (res) {
                    return res;
                }
            }
            return null;
        };
        return findByDref(state.folders);
    },

    foldersBySpecificType: state => type => {
        if (!type) {
            return state.folders;
        }
        return state.folders.filter(folder => folder.folderType === type);
    }
}

const actions = {
    getFolders({ commit }) {
        client.folders.then(data => {
            commit('setRevision', data.revision);
            commit('setFolders', data.folders);
        }).catch(err => err)
    },

    setCurrentFolder({commit}, folderDref) {
        commit('setCurrentFolder', getters.findFolder(state)(folderDref));
    }
}

const mutations = {
    setRevision(state, revision) {
        state.revision = revision;
    },

    setFolders(state, folders) {
        state.folders = folders
    },

    setCurrentFolder(state, folder) {
        state.currentFolder = folder;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}