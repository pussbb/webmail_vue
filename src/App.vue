<template>
  <div id="webmail">
    <Notifications></Notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import Notifications from "./Nofications"

export default {
  name: 'Webmail',
  components: {Notifications},

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
