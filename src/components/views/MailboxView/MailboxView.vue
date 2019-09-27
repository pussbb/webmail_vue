<template>
    <div>
        <b-button-toolbar aria-label="Toolbar with button groups" key-nav>

            <b-button-group class="mx-1">
                <b-button @click="changeLayout">
                    <i class="vertical-layout-icon" v-show="verticalLayout"/>
                    <i class="horizontal-layout-icon" v-show="!verticalLayout"/>
                </b-button>
            </b-button-group>
        </b-button-toolbar>

        <div v-if="verticalLayout">
            <b-container fluid id="verticalLayout">
                <b-row>
                    <b-col class="border-right">
                        <EmailsListView/>
                    </b-col>
                    <b-col class="border-left">
                        <EmailView/>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div v-else>
            <b-container fluid id="horizontalLayout">
                <b-row>
                    <div class="col" css="height: 50%">
                        <EmailsListView/>
                    </div>

                </b-row>
                <b-row class="bg-dark divider">&nbsp;</b-row>
                <b-row>
                    <div class="col" css="height: 50%">
                        <EmailView/>
                    </div>
                </b-row>
            </b-container>
        </div>

    </div>
</template>
<script>
    import EmailsListView from "./EmailsListView/EmailsListView"
    import EmailView from "./EmailView"

    export default {
        name: 'mailbox-view',

        components: {
            EmailsListView,
            EmailView
        },

        data() {
            return {
                verticalLayout: true,
            }
        },

        methods: {
            changeLayout() {
                this.verticalLayout = !this.verticalLayout;
                this.$forceUpdate();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #verticalLayout #emails {
        overflow: auto;
        max-height: 70vh;
        max-width: 40vw;
    }

    #horizontalLayout #emails {
        overflow: auto;
        max-height: 70vh;
        max-width: 80vw;
    }

    .divider {
        max-height: 2px;
        margin: 5px 5px;
    }
</style>
