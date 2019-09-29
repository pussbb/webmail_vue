<template>
    <div>
        <b-button variant="primary" :disabled="!currentFolder">New Contact</b-button>
        <div class="loading" v-show="isLoading">
            <b-spinner class="mx-auto" label="Loading..."></b-spinner>
        </div>
        <b-card-group columns>
            <PersonView :key="dref" v-for="(contact, dref) of contacts" :person="contact"/>
        </b-card-group>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import PersonView from "./Person"


    export default {
        name: 'people-list-view',
        components: {PersonView},
        computed: {
            ...mapState('mailbox', ['currentFolder', 'messagesLoadingStatus', 'messageLoadedCount']),

            isLoading() {
                return this.messagesLoadingStatus === 'loading'
            },
            contacts() {
                if (!this.$store.state.mailbox.currentFolder) {
                    return {};
                }
                return this.$store.state.mailbox.currentFolder.emails
            }
        },

        watch: {
           currentFolder(val) {
                if (val) {
                    this.$store.dispatch('mailbox/getCurrentFolderMessages', {from:0 , detail:'full'});
                }
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div:first-child {
        text-align: left;
    }
</style>
