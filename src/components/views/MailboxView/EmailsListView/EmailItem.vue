<template>
    <li class="border" @click.prevent="onClick"
        :class="{'border ': item.unread,
            'border-success bg-warning ' : (item.unread && !active), 'bg-secondary border-dark text-light': active}">
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
        data() {
            return {active: false}
        },
        watch: {
            $route(to, from) {
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
