<template>
    <div id="emails" @scroll.passive='handleScroll'>
        <ul>
            <EmailItem :item="email" :key="directref" v-for="(email, directref) of emails"/>
            <li class="loading" v-show="isLoading">
                <b-spinner class="mx-auto" label="Loading..."></b-spinner>
            </li>
            <li v-show="(isLoading !== true && isEmptyFolder)">There are no messages in that mailbox.</li>
        </ul>
    </div>
</template>
<script>
    import EmailItem from "./EmailItem"
    import {mapState} from 'vuex'

    export default {
        name: 'emails-list-view',

        components: {
            EmailItem
        },

        data() {
            return {}
        },

        computed: {
            ...mapState('mailbox', ['currentFolder', 'messagesLoadingStatus', 'messageLoadedCount']),
            isEmptyFolder() {
                return this.messageLoadedCount <= 0;
            },

            isLoading() {
                return this.messagesLoadingStatus === 'loading'
            },

            emails() {
                return this.$store.state.mailbox.currentFolder ? this.$store.state.mailbox.currentFolder.emails : {}
            }

        },

        watch: {
            /*messagesLoadingStatus() {
                if (this.$store.state.mailbox.currentFolder) {
                    this.emails = this.$store.state.mailbox.currentFolder.emails;
                }
            },*/

            currentFolder(val) {
                if (val) {
                    this.$store.dispatch('mailbox/getCurrentFolderMessages', {from:0 , to:50});
                }
            },

        },

        methods: {
            handleScroll() {
                if (
                    this.$el.scrollTop == (this.$el.scrollHeight - this.$el.offsetHeight)
                    && (this.currentFolder && this.currentFolder.hasMore)
                    && !this.isLoading
                ) {
                    this.$store.dispatch('mailbox/getCurrentFolderMessages', {from:this.currentFolder.emailsLoadedCount , to:50});
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
