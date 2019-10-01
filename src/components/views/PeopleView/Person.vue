<template>
    <div v-if="isContact">
        <b-card bg-variant="light" class="text-left">
            <template v-slot:header>
                <i class="contact-icon"></i>&nbsp;{{person.formattedName}}
            </template>
            <b-card-text>
                <div v-show="person.emails.length > 0"><i class="fas fa-at"></i>&nbsp;{{person.emails.join(', ')}}</div>
                <div v-show="person.telephone.length > 0"><i class="fas fa-phone"></i>&nbsp;{{person.telephone.join(', ')}}</div>
                <div v-show="person.organization"><i class="far fa-building"></i>&nbsp;{{person.organization}}</div>
            </b-card-text>
        </b-card>

    </div>
</template>
<script>
    import {Message} from "@/_sxapi/message"
    export default {
        props: {
            person: {
                required: true
            }
        },
        name: 'PersonView',
        computed: {
            isContact() {
                return (this.person instanceof Message.ContactObject)
            }
        },

        watch: {

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div:first-child {
        text-align: left;
    }
</style>
