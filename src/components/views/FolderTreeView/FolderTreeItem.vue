<template>
    <li :draggable="!item.isSpecialFolder"
        :id="'folder-tree-item-'+item.directRef">
        <router-link
                :class="{ active: currentFolderDref === item.directRef }"
                :id="'folder-tree-item-name-'+item.directRef"
                :to="{name: folderRouteName, params: {'folderdref': item.directRef}}"
                tag="div">
            <i :class="folderClassIcon"/>
            {{ item.name }}
            <b-badge v-show="item.unread" variant="danger">{{item.unread}}</b-badge>
        </router-link>

        <b-popover :target="'folder-tree-item-name-'+item.directRef" triggers="hover">
            <template v-slot:title>{{ item.name }}</template>
            Total messages: {{ item.total }}
        </b-popover>

        <ul v-show="item.subFolders">
            <FolderTreeItem :item="folder" :key="folder.directRef" v-for="folder in item.subFolders"/>
        </ul>
    </li>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'FolderTreeItem',
        computed: {
            ...mapGetters('mailbox', ['currentFolderDref']),

            folderClassIcon: function () {
                if (this.item.isSpecialFolder) {
                    return `folder-${this.item.specialFolderName}-icon`;
                }
                return `folder-${this.item.folderType.description.replace('.', '-')}-icon`;
            },

            folderRouteName: function () {
                if (this.item.isCalendarFolder) {
                    return 'calendar';
                }
                if (this.item.isTasksFolder) {
                    return 'tasks';
                }
                if (this.item.isContactsFolder) {
                    return 'people';
                }
                return 'mail'
            }
        },
        methods: {
            onDrop(e) {
                e.preventDefault()
            },
            onDragEnter(e) {
                e.preventDefault()
            },
            onDragleave(e) {
                e.preventDefault()
            },
            dragStart() {
                console.log(arguments)
            },


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li {
        text-align: left;
        cursor: pointer;
    }

    li > div:first-child:hover,
    div.active {
        background-color: #edede1;
    }
</style>
