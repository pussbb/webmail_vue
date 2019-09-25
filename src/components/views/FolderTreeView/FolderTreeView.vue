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
            ...mapGetters('mailbox', ['foldersBySpecificType']),

            folders: function () {
                const _folders = this.foldersBySpecificType(this.filterFolderType);
                return [
                    ..._folders.filter(i => i.namespace === 'private').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'others').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'shared').sort((a, b) => a.compareTo(b)),
                ]
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
