<template>
    <div class="folder-tree-view">
        <ul>
        </ul>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'FolderTreeView',
        components: {  },
        computed: {
            ... mapState('mailbox', ['folders']),
        },
        mounted () {
            this.$store.dispatch('mailbox/getFolders')
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
