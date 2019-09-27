<template>
    <div>
        <Header tabName=""></Header>

        <b-jumbotron>
            <template v-slot:header>{{userInfo.displayName}}</template>

            <template v-slot:lead>
                Primary email: {{userInfo.smtpAddress}}
                <br>
                <em>User class is {{userInfo.userClass.description}}</em>
                <em v-show="userInfo.isActiveSyncUser"> and allowed to use ActiveSync feature</em>
            </template>
            <hr class="my-4">
            <div>
                Users email addresses:
                <ul>
                    <li :key="index" v-for="(email, index) in userInfo.senderInternetAdresses">{{email}}</li>
                </ul>
            </div>
        </b-jumbotron>
    </div>
</template>

<script>
    import Header from "./Header"
    import {mapGetters} from "vuex"

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
    div.jumbotron {
        margin: 1% 1%;
    }

    div.jumbotron > div:not(:first-child) {
        text-align: left;
    }
</style>
