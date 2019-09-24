<template>
    <li disabled>
        {{ item.name }}
        <ul v-show="item.subFolders">
            <FolderTreeItem v-for="(folder, indx) in item.subFolders"  :key="indx" :item="folder"/>
        </ul>
    </li>
</template>

<script>

    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'FolderTreeItem',
        components: {  },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li {
        text-align: left;
        cursor: pointer;
    }
</style>
