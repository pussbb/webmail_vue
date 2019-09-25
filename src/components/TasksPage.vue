<template>
    <div>
        <Header tabName="tasks"></Header>
        <b-container fluid>
            <b-row>
                <b-col cols="2"><FolderTreeView :filterFolderType="filter" /></b-col>
                <b-col>2 of 2</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Header from "./Header"
    import { FolderTypeEnum } from "@/_sxapi/Folder"
    import FolderTreeView from "./views/FolderTreeView"

    export default {
        name: 'TasksPage',
        components: {
            Header,
            FolderTreeView
        },
        data: function() {
            return {
                filter: FolderTypeEnum.Tasks
            }
        },
        mounted() {
            if (this.$route.params.folderdref) {
                this.$store.dispatch('mailbox/setCurrentFolder', this.$route.params.folderdref);
            }
        },
        beforeRouteLeave (to, from, next) {
            this.$store.dispatch('mailbox/setCurrentFolder', null);
            next();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
