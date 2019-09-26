<template>
    <div class="folder-tree-view">
        <ul>
            <FolderTreeItem v-for="folder in folders" :key="folder.directRef" :item="folder"/>
        </ul>
    </div>
</template>

<script>

    import FolderTreeItem from "./FolderTreeItem"
    import { mapGetters } from 'vuex'

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
                    if (!this.currentFolderDref || !folder) {
                        folder = res[0];
                        if (folder) {
                            this.$store.dispatch('mailbox/setCurrentFolder', folder.directRef);
                        }
                    }
                }

                return res;
            }
        },

        created() {
            this.$store.dispatch('mailbox/getFolders')
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
