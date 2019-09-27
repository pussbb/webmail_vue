<template>
    <div id="message-view">
        <div v-if="email">
            <p v-show="email.subject">Subject: {{email.subject}} </p>
            <p v-show="email.from">From: {{email.from}} </p>
            <p v-show="email.bcc">BCC: {{email.bcc}} </p>
            <p v-show="email.cc">CC: {{email.cc}} </p>
            <p v-show="email.received">CC: {{email.received}} </p>

            <hr>
            <div v-if="htmlPart">
                <b-embed
                        type="iframe"
                        :srcDoc="htmlPart.body"
                ></b-embed>
            </div>
            <div v-else-if="textPart">
                <pre>
                    {{textPart.body}}
                </pre>
            </div>
            <div v-else>
                <b> Message Body empty</b>
            </div>
        </div>
        <div v-else-if="loading"  class="mx-auto">
            <b-spinner label="Loading..." class="mx-auto"></b-spinner>
        </div>
        <div v-else></div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'email-view',
        data() {
            return {
                email: null,
                loading: false
            }
        },
        computed: {
            ...mapGetters('mailbox', ['fetchEmail', 'currentFolderDref']),
            textPart() {
                if (!this.email) {
                    return null;
                }
                return this.email.parts.filter( i => i.ct === 'text/plain')[0]
            },
            htmlPart() {
                if (!this.email) {
                    return null;
                }
                return this.email.parts.filter( i => i.ct === 'text/html')[0]
            }
        },

        methods: {
            loadEmail(msgdref) {
                if (!msgdref) {
                    this.item = null
                    return
                }
                const folderDref = this.currentFolderDref;
                this.loading = true
                this.fetchEmail(msgdref)
                    .then( data => {
                        if (folderDref === this.currentFolderDref) {
                            this.email = data[0]
                        } else {
                            console.log('folder changed')
                        }

                    }).catch( err => {
                    console.log(err)
                }).finally(() => this.loading = false)
            },
        },

        created() {
            this.loadEmail(this.$router.currentRoute.params.msgdref)
        },
        watch: {
            $route(to, from) {
                // react to route changes...
                this.loadEmail(to.params.msgdref)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #message-view {
        text-align: left;
        max-width: 35vw;
        overflow: auto;
    }
</style>
