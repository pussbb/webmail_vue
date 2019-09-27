<template>
    <div clas="mailbox-layout">
        <Header :tabName="currentTabName"></Header>
        <b-container fluid>
            <b-row>
                <b-col cols="2">
                    <FolderTreeView :filterFolderType="showFolderType"/>
                </b-col>
                <b-col>
                    <message-view></message-view>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Header from "./Header"
    import FolderTreeView from "./views/FolderTreeView"
    import BlankView from "./views/BlankView"
    import MailboxLayoutMixin from "@/components/mixins/MailboxLayoutMixin";


    export default {
        name: 'mailbox-layout',
        mixins: [MailboxLayoutMixin],
        components: {
            Header,
            FolderTreeView,
            'message-view': BlankView
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
