<template>
    <div>
        <Header tabName=""></Header>
        {{ userInfo.displayName }}
    </div>
</template>

<script>
    import Header from "./Header"
    import { mapGetters } from "vuex"

    export default {

        name: 'ProfilePage',
        components: {
            Header
        },
        computed: {
            ...mapGetters('account', ['userInfo']),
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
