<template>
    <div id="emails">
        <ul v-if="emails.length !== 0">
            <EmailItem v-for="email in emails" :key="email.uid" :item="email" />
        </ul>
        <ul v-else>
            <li v-show="messagesLoadingStatus === 'loading'" class="loading">
                <b-spinner label="Loading..." class="mx-auto"></b-spinner>
            </li>
            <li v-show="messagesLoadingStatus !== 'loading'">There are no messages in that mailbox.</li>
        </ul>
    </div>
</template>
<script>
    import EmailItem from "./EmailItem"
    import { mapState } from 'vuex'

    export default {
        name: 'emails-list-view',

        components: {
            EmailItem
        },

        data() {
            return {emails:[]}
        },

        computed: {
            ...mapState('mailbox', ['currentFolder', 'messagesLoadingStatus']),

        },

        watch: {
            messagesLoadingStatus() {
                if (this.$store.state.mailbox.currentFolder) {
                    this.emails = this.$store.state.mailbox.currentFolder.emails;
                }
            },
            currentFolder(val) {
                if (val) {
                    this.$store.dispatch('mailbox/getCurrentFolderMessages');
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    ul {
        text-align: left;
        padding-left: 0px;
    }

    li.loading {
        width: 100%;
        padding-left: 50%;
    }


</style>
