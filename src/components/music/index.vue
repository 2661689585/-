<template>
    <div class="bg music" :class="data ? '' : 'c'">
    </div>
</template>

<script setup>
    const props = defineProps(['data']);
</script>

<style scoped>
    .music {
        width: 25px;
        height: 21px;
        background-position: -175px -75px;
        position: absolute;
        top: 2px;
        left: -12px;
    }
    .c{
        background-position: -150px -75px;
    }
</style>