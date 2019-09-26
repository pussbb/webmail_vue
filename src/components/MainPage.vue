<script>
import MailBoxLayout from "./MailBoxLayout"

export default {
  name: 'MainPage',
  extends: MailBoxLayout,
  data() {
    return { currentTabName: 'mail'}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}
</style>
