<template>
    <div>
        <ul v-if="emails.length > 0">
            <EmailItem v-for="(email, index) in emails" :key="index" ></EmailItem>
        </ul>
        <ul v-else>
            <li>There are no messages in that mailbox.</li>
        </ul>
    </div>
</template>
<script>
    import EmailItem from "./EmailItem"

    export default {
        name: 'emails-list-view',

        components: {
            EmailItem
        },
        data() {
            return {emails:[]}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
