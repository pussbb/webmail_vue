import client from '@/_sxapi/'

const state = {
    revision: '',
    folders: [],
    currentFolder: null,
    messageLoadingStatus: 'initial'
}


const getters = {
    currentFolderDref: state => state.currentFolder ? state.currentFolder.directRef : null,

    currentFolderMessages: state => state.currentFolder ? state.currentFolder.emails : [],

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
        if (!folderDref) {
            return null;
        }
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
        commit('setCurrentFolderEmailsFetchingStatus', "initial");
    },

    getCurrentFolderMessages({commit}) {
        if (!state.currentFolder) {
            throw 'Select a folder';
        }

        const dref = state.currentFolder.directRef;
        commit('setCurrentFolderEmailsFetchingStatus', 'loading');
        client.folderEmails(state.currentFolder).then(data => {
            if (dref === state.currentFolder.directRef) {
                commit('setCurrentFolderEmails', data);
            } else {
                console.log('folder changed')
            }
        }).catch(err => {
            console.error(err)
            commit('setCurrentFolderEmailsFetchingStatus', 'done')
        });
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
    },

    setCurrentFolderEmails(state, emails) {
        state.currentFolder.emails = emails;
        state.messageLoadingStatus = 'done'
    },

    setCurrentFolderEmailsFetchingStatus(state, status) {
        state.messageLoadingStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}