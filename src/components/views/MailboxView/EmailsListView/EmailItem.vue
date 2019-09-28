<template>
    <li :class="{'border ': item.unread,
            'border-success bg-warning ' : (item.unread && !active), 'bg-secondary border-dark text-light': active}"
        @click.prevent="onClick"
        class="border unselectable"
        draggable="true"
        @dragover.prevent
        @dragstart="onDragStart">
        From: {{item.from}} <br>
        {{item.subject}}
    </li>
</template>
<script>
    import {createDragImage} from "@/helpers/dnd";

    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'emails-item-view',
        data() {
            return {active: false}
        },
        watch: {
            $route(to) {
                this.active = this.item.directRef === to.params.msgdref
            }
        },
        methods: {
            onClick() {
                this.$router.push({
                    name: this.$router.currentRoute.name,
                    params: {
                        folderdref: this.item.folderDirectRef,
                        msgdref: this.item.directRef
                    }
                }).catch(err => {
                    // if (!(err instanceof NavigationDuplicated)) {
                    /// throw err;
                    // }
                });
            },

            onDragStart(e) {
                e.dataTransfer.setData(`email/${this.item.directRef}`, this.item.folderDirectRef);
                e.dataTransfer.setDragImage(
                    createDragImage(`${e.dataTransfer.types.length} email(s)`, e.pageX, e.pageY),
                    0,
                    0
                );
                e.dataTransfer.setData('DownloadURL', this.item.directRef);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li {
        cursor: pointer;
    }
</style>
