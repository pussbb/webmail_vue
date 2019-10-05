<template>
    <a class="dropdown-item" @click="onClick">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: "BaseContextMenuItem",
        methods: {
            onClick(e) {
                e.preventDefault()
                this.$emit('click', e);
            }
        }
    }
</script>

<style scoped>

</style>