<template>
    <li class="border" @click.prevent="onClick" :class="{'border bg-warning border-success': item.unread}">
        From: {{item.from}} <br>
        {{item.subject}}
    </li>
</template>
<script>
    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'emails-item-view',

        methods: {
            onClick() {

                this.$router.push({
                    name: this.$router.currentRoute.name,
                    params: {
                        folderdref: this.item.folderDirectRef,
                        msgdref: this.item.directRef
                    }
                }).catch(err => {
                    if (!(err instanceof 'NavigationDuplicated')) {
                        throw err;
                    }
                });
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
