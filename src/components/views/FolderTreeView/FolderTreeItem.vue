<template>
    <li :draggable="!item.isSpecialFolder"
        @dragstart="onDragStart"
        @dragover="onDragOver"
        @dragenter="onDragEnter"
        @dragleave="onDragleave"
        @dragend="onDragEnd"
        @drop="onDrop"
        :id="'folder-tree-item-'+item.directRef"
        class="unselectable">
        <router-link
                :class="{ active: currentFolderDref === item.directRef, border: canDrop}"
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
    import {createDragImage} from "@/helpers/dnd";
    import {routerName} from "./utils"

    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'FolderTreeItem',
        data() {
            return {
                canDrop: false,
                dragged: false,
            }
        },
        computed: {
            ...mapGetters('mailbox', ['currentFolderDref', 'findFolder']),

            folderClassIcon: function () {
                if (this.item.isSpecialFolder) {
                    return `folder-${this.item.specialFolderName}-icon`;
                }
                return `folder-${this.item.folderType.description.replace('.', '-')}-icon`;
            },

            folderRouteName: function () {
                return routerName(this.item);
            }
        },
        methods: {
            onDrop(e) {
                this.canDrop = false
                e.preventDefault();
                e.dataTransfer.types.forEach( item => {
                    const [type, dref] = item.split('/');
                    const data = e.dataTransfer.getData(item);
                    if (type === 'folder') {
                        const folder = this.findFolder(dref);
                        alert(`Moving folder ${folder?folder.name:dref} (${data}) to ${this.item.name}`)
                    } else if (type === 'email') {
                        const folder = this.findFolder(data);
                        alert(`Moving message ${dref} (from ${folder?folder.name:data}) to ${this.item.name}`)
                    }
                });
            },
            onDragEnter(e) {
                if (this.dragged) {
                    return;
                }
                this.canDrop  = e
                    .dataTransfer
                    .types
                    .filter( i => i.startsWith('folder/') || i.startsWith('email/'))
                    .length > 0;

            },
            onDragleave(e) {
                e.preventDefault()
                this.canDrop = false;
            },
            onDragOver(e) {
                e.preventDefault();
            },
            onDragStart(e) {
                this.dragged = true;
                e.dataTransfer.dropEffect = 'move';
                e.dataTransfer.setDragImage(createDragImage(this.item.name, e.pageX, e.pageY), 0, 0);
                e.dataTransfer.setData(`folder/${this.item.directRef}`, this.item.folderType.description);
            },
            onDragEnd() {
                this.dragged = false;
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

    li > div:first-child:hover,
    div.active {
        background-color: #edede1;
    }
</style>
