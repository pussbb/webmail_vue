import client from '@/_sxapi/'

const state = {
    revision: '',
    folders: [],
    currentFolder: null,
    messagesLoadingStatus: 'initial',
    messageLoadedCount: 0
}


const getters = {
    currentFolderDref: state => state.currentFolder ? state.currentFolder.directRef : null,

    fetchEmail: state => msgDref => {
        return new Promise((resolve, reject) => {
            if (!state.currentFolder) {
                reject('select folder')
            }
            client
                .fetchFolderEmail(state.currentFolder.directRef, msgDref)
                .then(data =>  resolve(data))
                .catch(err => reject(err))
        });
    },

    fetchEmailRfC822: state => msgDref => {
        return new Promise((resolve, reject) => {
            if (!state.currentFolder) {
                reject('select folder')
            }
            client
                .fetchEmailRfC822(state.currentFolder.directRef, msgDref)
                .then(data =>  resolve(data))
                .catch(err => reject(err))
        });
    },
    fetchEmailPart: state => (msgDref, partId) => {
        return new Promise((resolve, reject) => {
            if (!state.currentFolder) {
                reject('select folder')
            }
            client
                .fetchEmailPart(state.currentFolder.directRef, msgDref, partId)
                .then(data =>  resolve(data))
                .catch(err => reject(err))
        });
    },
    fetchEmailHeaders: state => msgDref => {
        return new Promise((resolve, reject) => {
            if (!state.currentFolder) {
                reject('select folder')
            }
            client
                .fetchEmailHeaders(state.currentFolder.directRef, msgDref)
                .then(data =>  resolve(data))
                .catch(err => reject(err))
        });
    },

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

    getCurrentFolderMessages({commit}, {from=0, to, detail}) {
        if (!state.currentFolder) {
            throw 'Select a folder';
        }

        const folder = state.currentFolder;
        if (!folder) {
            commit('setCurrentFolderEmailsFetchingStatus', 'done');
            return
        }
        commit('setCurrentFolderEmailsFetchingStatus', 'loading');
        client.folderEmails(state.currentFolder, from, to, detail).then(data => {
            if (folder) {
                if (state.currentFolder && folder.directRef === state.currentFolder.directRef) {
                    commit('setCurrentFolderEmails', data);
                } else {
                    folder.emails = data;
                    console.log('folder changed')
                }
            }

        }).catch(err => {
            console.error(err)
        }).finally( () => commit('setCurrentFolderEmailsFetchingStatus', 'done'));

    },
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
        state.messageLoadedCount = folder ? folder.emailsLoadedCount : -1;
    },

    setCurrentFolderEmails(state, emails) {
        state.currentFolder.emails = emails;
        state.messageLoadedCount = state.currentFolder.emailsLoadedCount
    },

    setCurrentFolderEmailsFetchingStatus(state, status) {
        state.messagesLoadingStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}