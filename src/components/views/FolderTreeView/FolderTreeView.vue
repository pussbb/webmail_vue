<template>
    <div class="folder-tree-view">
        <ul>
            <FolderTreeItem v-for="folder in folders" :item="folder"/>
        </ul>
    </div>
</template>

<script>

    import FolderTreeItem from "./FolderTreeItem"

    export default {
        name: 'FolderTreeView',
        components: {
            FolderTreeItem
        },

        computed: {
            folders: function () {
                const _folders = this.$store.state.mailbox.folders;
                return [
                    ..._folders.filter(i => i.namespace === 'private').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'others').sort((a, b) => a.compareTo(b)),
                    ..._folders.filter(i => i.namespace === 'shared').sort((a, b) => a.compareTo(b)),
                ]
            }
        },

        created() {
            this.$store.dispatch('mailbox/getFolders')
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
