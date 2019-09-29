<template>
    <div class="folder-tree-view">
        <ul>
            <FolderTreeItem :item="folder" :key="folder.directRef" v-for="folder in folders"/>
        </ul>
    </div>
</template>

<script>

    import FolderTreeItem from "./FolderTreeItem"
    import {mapGetters} from 'vuex'
    import {routerName} from "./utils"

    export default {
        props: {
            filterFolderType: null
        },
        name: 'FolderTreeView',
        components: {
            FolderTreeItem
        },

        computed: {
            ...mapGetters('mailbox', ['foldersBySpecificType', 'currentFolderDref', 'findFolder']),

            folders: function () {
                const _folders = this.foldersBySpecificType(this.filterFolderType);
                const res = [
                    ..._folders.filter(i => i.namespace === 'private').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'others').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'shared').sort((a, b) => a.compareTo(b)),
                ];
                if (res) {
                    let folder = this.findFolder(this.currentFolderDref)
                    if (folder && (this.filterFolderType && folder.folderType != this.filterFolderType)) {
                        this.$store.dispatch('mailbox/setCurrentFolder', null);
                    }

                }

                return res;
            }
        },

        created() {
            this.$store.dispatch('mailbox/getFolders')
        },

        watch: {
            folders(folders) {
                if (!this.$router.currentRoute.params.folderdref && folders) {
                    const folder = folders[0];
                    if (folder) {
                        this.$router.push({
                            name: routerName(folder),
                            params: {
                                folderdref: folder.directRef
                            }
                        });
                    }


                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
