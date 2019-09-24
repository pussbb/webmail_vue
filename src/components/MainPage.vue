<template>
  <div>
    <Header tabName="mail"></Header>
    <b-container fluid>
      <b-row>
        <b-col cols="2"><FolderTreeView /></b-col>
        <b-col>2 of 2</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Header from "./Header"
  import FolderTreeView from "./views/FolderTreeView"

export default {
  name: 'MainPage',
  components: {
    Header,
    FolderTreeView
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}
</style>
