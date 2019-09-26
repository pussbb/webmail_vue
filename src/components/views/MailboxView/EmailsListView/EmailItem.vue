<template>
    <li>
        From: {{item.from}} <br>
        {{item.subject}}
    </li>
</template>
<script>
    export default {
        props: {
            item: {
                required: true
            }
        },
        name: 'emails-item-view',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
