<template>
    <div id="message-view">
        <div v-if="email">
            <b-modal
                    id="modal-headers"
                    ref="modalHeaders"
                    size="lg"
                    scrollable
                    :title="modalTitle"
                    hide-footer >
                        <pre>{{headers}}</pre>
            </b-modal>
            <div>
                <b-button-group class="mt-3">
                    <b-button><i class="fas fa-reply"></i> Relply</b-button>
                    <b-button><i class="fas fa-reply-all"></i> Reply All</b-button>
                    <b-button><i class="fas fa-share"></i> Forward</b-button>
                    <b-button><i class="far fa-trash-alt"></i> Delete</b-button>
                    <b-dropdown right text="More ">
                        <b-dropdown-item @click="downloadEmail"><i class="fas fa-download"></i> Download</b-dropdown-item>
                        <b-dropdown-divider ></b-dropdown-divider>
                        <b-dropdown-item @click="showHeaders">View Headers</b-dropdown-item>
                        <b-dropdown-item @click="showSource">View Source</b-dropdown-item>
                    </b-dropdown>

                </b-button-group>
            </div>
            <p class="email-header-row" v-show="email.subject">Subject: {{email.subject}} </p>
            <p class="email-header-row" v-show="email.from">From:
                <em v-for="(item, index) of email.from" :key="index">{{item.name || item.address}}, </em>
            </p>
            <p class="email-header-row" v-show="email.to">To:
                <em v-for="(item, index) of email.to" :key="index">{{item.name || item.address}}, </em>
            </p>
            <p class="email-header-row" v-show="email.bcc">BCC:
                <em v-for="(item, index) of email.bcc" :key="index">{{item.name || item.address}}, </em>
            </p>
            <p class="email-header-row" v-show="email.cc">CC:
                <em v-for="(item, index) of email.cc" :key="index">{{item.name || item.address}}, </em>
            </p>
            <p class="email-header-row" v-show="email.received">Received: {{email.received}} </p>
            <b-list-group horizontal v-if="email.hasAttachment">
                <b-list-group-item  class="unselectable"  @click.prevent="downloadAttach(attach)" :key="email.directRef+'-attach-'+index" v-for="(attach, index) of email.attachments">
                    <i class="fas fa-paperclip"></i> {{ attach['fname'] || 'Unknown'}}
                </b-list-group-item>
            </b-list-group>
            <hr>
            <div v-if="htmlPart">
                <a @click.prevent="showExternalImages">
                    <b-alert
                        class="unselectable"
                        v-show="htmlPart.hasBlockedImages"
                        show
                        variant="warning">
                        Show external images
                    </b-alert>
                </a>
                <b-embed
                        :srcDoc="htmlPart.body"
                        type="iframe"
                        sandbox
                ></b-embed>
            </div>
            <div v-else-if="textPart">

                    <b-embed
                            :srcDoc="textPart"
                            type="iframe"
                            sandbox
                    ></b-embed>

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
    import {decodeBodyPart} from "@/helpers/mime"
    import {textToHtml, cleanHtml} from "@/helpers/renderer";

    export default {
        name: 'email-view',
        data() {
            return {
                email: null,
                loading: false,
                error: false,
                headers: null,
                blockExternalImages: true,
                modalTitle: ''
            }
        },
        computed: {
            ...mapGetters('mailbox', ['fetchEmail', 'currentFolderDref', 'fetchEmailRfC822',
                'fetchEmailHeaders', 'fetchEmailPart']),
            textPart() {
                if (!this.email) {
                    return null;
                }
                const part = this.email.parts.filter(i => i.ct === 'text/plain' && i.size > 0)[0];
                if (!part) {
                    return null;
                }
                return textToHtml(decodeBodyPart(part), part.ct);
            },
            htmlPart() {
                if (!this.email) {
                    return null;
                }
                const part = (this.email.parts.filter(i => i.ct === 'text/html' && i.size > 0)[0]);
                if (!part) {
                    return null;
                }
                return cleanHtml(decodeBodyPart(part), this.blockExternalImages);
            }
        },

        methods: {
            showExternalImages() {
                this.blockExternalImages = false;
            },
            downloadAttach(attach) {
                if (!this.email) {
                    return;
                }
                this.$store.dispatch('notification/addInfo', 'Download of attachment will start soon, please wait.')
                this.fetchEmailPart(this.email.directRef, attach.spec)
                    .then(data => {
                        const a = document.createElement('a');
                        a.href = `data:${attach.ct};${attach.enc},${encodeURIComponent(data)}`;
                        a.download = attach.fname || 'unknown';
                        a.click();
                    })
                    .catch(err => {
                        this.$store.dispatch('notification/addError', `Failed to download attachment. Reason: ${err}`)
                    })
            },
            showHeaders() {
                if (!this.email) {
                    return;
                }
                this.fetchEmailHeaders(this.email.directRef)
                    .then(data => {
                        this.modalTitle = 'Email Headers'
                        this.headers = data;
                        this.$refs.modalHeaders.show()
                    })
                    .catch(err => {
                        this.$store.dispatch('notification/addError', `Failed to download email. Reason: ${err}`)
                    })
            },
            showSource() {
                if (!this.email) {
                    return;
                }
                this.fetchEmailRfC822(this.email.directRef)
                    .then(data => {
                        this.modalTitle = 'Email Source'
                        this.headers = data;
                        this.$refs.modalHeaders.show()
                    })
                    .catch(err => {
                        this.$store.dispatch('notification/addError', `Failed to download email. Reason: ${err}`)
                    })
            },
            downloadEmail() {
                if (!this.email) {
                    return;
                }
                this.$store.dispatch('notification/addInfo', 'Download of email will start soon please wait.')
                this.fetchEmailRfC822(this.email.directRef)
                    .then(data => {
                        const a = document.createElement('a');
                        a.href = "data:message/rfc822,"+encodeURIComponent(data);
                        a.download = `${this.email.directRef}.eml`;
                        a.click();

                    })
                    .catch(err => {
                        this.$store.dispatch('notification/addError', `Failed to download email. Reason: ${err}`)
                    })
            },
            loadEmail(msgdref) {
                this.blockExternalImages = true
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
                            if (data.length <= 0) {
                                this.error = true;
                                this.$store.dispatch('notification/addWarning', 'Failed to load message. It can be deleted.')
                            }
                            this.email = data[0]
                        } else {
                            this.$store.dispatch('notification/addWarning', 'FolderChanged')
                        }

                    }).catch(err => {
                    if (folderDref === this.currentFolderDref) {
                        this.error = true;
                    }
                    this.$store.dispatch('notification/addErr', err)
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
            $route(to) {
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
    .email-header-row {
        margin: 0 0 0 0;
    }
    .list-group-item {
        cursor: pointer;
    }
    .alert {
        cursor: pointer;
    }
</style>
