<script setup>
const { toggleCart, cart } = useCart();
</script>

<template>
  <div class="relative cursor-pointer inline-flex items-center" title="Cart" @click="toggleCart">
    <div class="flex gap-3 justify-center items-center bg-light-yellow hover:brightness-90 transition rounded-[63px] h-[40px] px-4">
      <span class="text-lg font-semibold">{{ cart?.contents?.itemCount }}</span>
      <Icon name="ph:tote" size="32" style="color: black" />
    </div>
  </div>
</template>

<style lang="postcss">
/* popIn */
.popIn-enter-active,
.popIn-leave-active {
  transition: all 200ms cubic-bezier(0, 0, 0.57, 1.61);
}

.popIn-enter-from,
.popIn-leave-to {
  transform: scale(0);
}
</style>
