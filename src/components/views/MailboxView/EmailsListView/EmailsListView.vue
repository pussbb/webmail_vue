<template>
    <div>
        {{currentFolderMessages}}
        <ul v-if="currentFolderMessages.length > 0">
            <EmailItem v-for="email in currentFolderMessages" :key="email.uid" :item="email"></EmailItem>
        </ul>
        <ul v-else>

            <li v-show="messageLoadingStatus !== 'done'"><b-spinner label="Loading..."></b-spinner></li>
            <li v-show="messageLoadingStatus === 'done'">There are no messages in that mailbox.</li>
        </ul>
    </div>
</template>
<script>
    import EmailItem from "./EmailItem"
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'emails-list-view',

        components: {
            EmailItem
        },

        computed: {
            ...mapState('mailbox', ['currentFolder', 'messageLoadingStatus']),
            ...mapGetters('mailbox', ['currentFolderMessages']),
        },
        watch: {
            currentFolder: {
                handler(oldVal, newVal) {
                    if (newVal) {
                        this.$store.dispatch('mailbox/getCurrentFolderMessages');
                    }
                },
                immediate: true
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
