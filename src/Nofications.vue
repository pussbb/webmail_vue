<template>
    <div>
        <b-toast
            v-for="notif of notifications"
            :id="notif.id"
            :key="notif.id"
            :title="notif.title"
            :visible="true"
            v-on:hide="onHideToast"
            :variant="notif.variant">
        {{notif.message}}
    </b-toast>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: 'notifications',
        computed: {
            ...mapGetters('notification', ['notifications'])
        },
        methods: {
            onHideToast(e) {
                this.$store.dispatch('notification/removeNotification', e.componentId)
            }
        }
    }

</script>

<style>
    #webmail {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }
</style>
