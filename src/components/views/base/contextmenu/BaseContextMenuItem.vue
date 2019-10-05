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
                e.preventDefault();
                e.stopImmediatePropagation();
                this.$emit('click', e);
                if (this.$parent) this.$parent.$emit('hide')
            }
        }
    }
</script>

<style scoped>

</style>