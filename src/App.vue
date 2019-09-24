<template>
  <div id="webmail">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Webmail',
  computed: {
    ...mapState('account', ['user']),
  }

}

</script>

<style>
#webmail {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
