<template>
    <div>
        <b-button variant="primary" :disabled="!currentFolder">New Task</b-button>
        <div class="loading" v-show="isLoading">
            <b-spinner class="mx-auto" label="Loading..."></b-spinner>
        </div>
        <ul class="list-group">
            <TaskView :key="dref" v-for="(task, dref) of tasks" :task="task"/>
        </ul>
    </div>
</template>
<script>
    import TaskView from "./TaskView"
    import {mapState} from "vuex"

    export default {
        name: 'tasks-view',
        components: {
            TaskView
        },
        computed: {
            ...mapState('mailbox', ['currentFolder', 'messagesLoadingStatus', 'messageLoadedCount']),

            isLoading() {
                return this.messagesLoadingStatus === 'loading'
            },
            tasks() {
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

</style>
