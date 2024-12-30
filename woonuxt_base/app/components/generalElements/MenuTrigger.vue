<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
    <Icon name="ion:menu-outline" size="32" class="cursor-pointer text-white" @click="toggleMobileMenu" />
</template>
