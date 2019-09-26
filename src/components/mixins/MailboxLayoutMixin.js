
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            showFolderType: null,
            currentTabName: null,
            resetSelectedFolder: false
        }
    },

    computed: {
        ...mapGetters('mailbox', ['currentFolderDref', 'findFolder']),
    },

    beforeRouteUpdate (to, from, next) {
        if (to.params.folderdref) {
            this.$store.dispatch('mailbox/setCurrentFolder', to.params.folderdref);
        }
        next();
    },

    mounted() {
        if (this.$route.params.folderdref) {
            this.$store.dispatch('mailbox/setCurrentFolder', this.$route.params.folderdref);
        }
    },

    beforeRouteLeave (to, from, next) {
        if (this.resetSelectedFolder) {
            this.$store.dispatch('mailbox/setCurrentFolder', null);
        }
        next();
    },
}