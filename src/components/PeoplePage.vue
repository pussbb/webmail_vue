<script>
    import {FolderTypeEnum} from "@/_sxapi/Folder"
    import MailBoxLayout from "./MailBoxLayout"
    import PeopleView from "./views/PeopleView/PeopleListView"

    export default {
        name: 'PeoplePage',
        extends: MailBoxLayout,
        components: {
            'message-view': PeopleView
        },
        data: function () {
            return {
                resetSelectedFolder: true,
                showFolderType: FolderTypeEnum.Contacts,
                currentTabName: "people",
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
