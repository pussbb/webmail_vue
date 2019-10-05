<template>
    <div class="dropdown-menu dropdown-menu-sm show" v-show="showContextMenu"
         :style="{top:contextMenuTop+'px', left:contextMenuLeft+'px'}">
        <slot></slot>
    </div>
</template>
<script>

    export default {
        props: {
            items: []
        },
        name: 'ContextMenu',

        data() {
            return {
                showContextMenu: false,
                contextMenuTop: 0,
                contextMenuLeft: 0
            }
        },

        methods: {
            hideOnOtherClickEvent(e) {
                // some components may have related popup item, on which we shall prevent the click outside event handler.
                let elements = e.path || (e.composedPath && e.composedPath())
                elements && elements.length > 0 && elements.unshift(e.target)
                if (!this.$el.contains(e.target)) {
                    this.hide();
                }
                return true;
            },
            onContextMenu(e) {
                e.preventDefault();

                if (!this.$slots.default && !this.items) {
                    return false;
                }
                if ( this.$slots.default.length <= 0 && this.items.length <= 0) {
                    return false;
                }

                this.hideOnOtherClickEvent(e);
                this.contextMenuTop = e.layerY;
                this.contextMenuLeft = e.layerX;
                this.showContextMenu = true;
                return false
            },
            hide () {
                this.contextMenuTop = 0;
                this.contextMenuLeft = 0;
                this.showContextMenu = false;
            }
        },
        mounted() {
            this.$parent.$el.addEventListener('contextmenu', this.onContextMenu);
            document.addEventListener('mousedown', this.hideOnOtherClickEvent);
            this.$on('hide', this.hide)
        },

        unmount() {
            if (this.$parent.$el) {
                this.$parent.$el.removeEventListener('contextmenu', this.onContextMenu);
            }
            document.removeEventListener('mousedown', this.hideOnOtherClickEvent);
            this.$off('hide', this.hide)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
