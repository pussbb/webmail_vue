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
                        :srcDoc="htmlPart.body"
                        type="iframe"
                        sandbox
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
        <div class="mx-auto" v-else-if="loading">
            <b-spinner class="mx-auto" label="Loading..."></b-spinner>
        </div>
        <div v-else-if="error">Error during loading message</div>
        <div v-else></div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'email-view',
        data() {
            return {
                email: null,
                loading: false,
                error: false
            }
        },
        computed: {
            ...mapGetters('mailbox', ['fetchEmail', 'currentFolderDref']),
            textPart() {
                if (!this.email) {
                    return null;
                }
                return this.email.parts.filter(i => i.ct === 'text/plain')[0]
            },
            htmlPart() {
                if (!this.email) {
                    return null;
                }
                return this.email.parts.filter(i => i.ct === 'text/html')[0]
            }
        },

        methods: {
            loadEmail(msgdref) {
                if (!msgdref) {
                    this.item = '';
                    return
                }
                const folderDref = this.currentFolderDref;
                this.loading = true
                this.error = false
                this.fetchEmail(msgdref)
                    .then(data => {
                        if (folderDref === this.currentFolderDref) {
                            this.email = data[0]
                        } else {
                            console.log('folder changed')
                        }

                    }).catch(err => {
                    if (folderDref === this.currentFolderDref) {
                        this.error = true;
                    }
                    console.log(err)
                }).finally(() => {
                    if (folderDref === this.currentFolderDref) {
                        this.loading = false
                    }

                })
            },
        },

        created() {
            if (this.email && this.email.folderDref !== this.$router.currentRoute.params.folderdref) {
                this.email = null;
            } else {
                this.loadEmail(this.$router.currentRoute.params.msgdref)
            }
        },
        watch: {
            $route(to, from) {
                // react to route changes...
                if (this.email && this.email.folderDref !== to.params.folderdref) {
                    this.email = null;
                }
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
