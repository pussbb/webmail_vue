<template>
    <li>
        <i :class="folderClassIcon"/>
        {{ item.name }}
        <ul v-show="item.subFolders">
            <FolderTreeItem v-for="folder in item.subFolders"  :key="folder.directRef" :item="folder"/>
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

        computed: {
            folderClassIcon: function () {
                if (this.item.isSpecialFolder) {
                    return `folder-${this.item.specialFolderName}-icon`;
                }
                return `folder-${this.item.folderType.description.replace('.', '-')}-icon`;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li {
        text-align: left;
        cursor: pointer;
    }
</style>
