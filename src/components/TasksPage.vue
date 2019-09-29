<script>
    import {FolderTypeEnum} from "@/_sxapi/Folder"
    import MailBoxLayout from "./MailBoxLayout"
    import TasksView from "./views/TasksView"

    export default {
        name: 'TasksPage',
        extends: MailBoxLayout,

        components: {
            'message-view': TasksView
        },

        data() {
            return {
                resetSelectedFolder: true,
                showFolderType: FolderTypeEnum.Tasks,
                currentTabName: "tasks",
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
