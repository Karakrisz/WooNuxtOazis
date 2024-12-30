<script setup lang="ts">
const { toggleSearch } = useSearching();
</script>

<template>
  <div class="relative cursor-pointer inline-flex" title="Cart" @click="toggleSearch">
    <Icon name="ph:magnifying-glass" size="32" style="color: black" />
  </div>
</template>
