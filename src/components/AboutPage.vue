<template>
    <div>
        <Header tabName=""></Header>

        <b-jumbotron>
            <template v-slot:header>Scalix WebMail </template>

            <template v-slot:lead>
                This is a simple Webmail implementation written with Vue as proof of concerns that its possible.
            </template>

            <hr class="my-4">

            <p>
                It uses utility classes for typography and spacing to space content out within the larger
                container.<br>

                Calendar <a href="https://github.com/ClickerMonkey/dayspan-vuetify" target="_blank"> dayspan-vuetify</a>
                 <a href="https://clickermonkey.github.io/dayspan-vuetify/example/" target="_blank"> DEMO example</a>
            </p>

            <b-button variant="primary" href="https://scalix.com" target="_blank">Visit Scalix Official website</b-button>
            <b-button variant="success" href="https://rm.scalix.com/" target="_blank">Report an issue (Support)</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    import Header from "./Header"

    export default {
        name: 'AboutPage',
        components: {
            Header
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.jumbotron {
        margin: 5% 5%;
    }
    div.jumbotron > a {
        margin: 0 5%;
    }
</style>
