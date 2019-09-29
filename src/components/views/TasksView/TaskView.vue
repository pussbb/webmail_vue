<template>
    <li v-if="isTask" class="bs-callout " :class="{'bs-callout-success':!task.isCompleted, 'bs-callout-danger':task.isCompleted}">
        <b-button size="sm"  class="float-right" v-if="!task.isCompleted">Mark as Done</b-button>
        <h6>{{task.title}} <b-badge variant="danger" v-show="task.isCompleted">Completed</b-badge></h6>
        <br>
        <hr v-show="task.description">
        {{task.description}}
        <b-progress-bar v-if="!task.isCompleted" :value="task.percents" variant="success" class="w-75 mb-2" show-progress>{{task.percents}} % completed</b-progress-bar>
    </li>
</template>
<script>
    import {Message} from "@/_sxapi/message"

    export default {
        name: 'task-item-view',
        props: {
            task: {
                required: true
            }
        },
        computed: {
            isTask() {
                return (this.task instanceof Message.Task)
            }
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li {
        margin: 10px 0;
        text-align: left;
    }
    hr {
        margin: 0 0 0 0;
    }
</style>
