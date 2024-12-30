<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    v-if="size === 'md'"
    type="submit"
    class="w-full button button-primary"
    :class="{ 'button-disabled': disabled }"
    :disabled="disabled"
    @click="isLoading = true">
    <span>{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
  </button>

  <PhosphorIconPlusCircle
    v-if="size === 'sm' && !isLoading"
    type="submit"
    class="w-[48px] h-[48px] hover:text-primary cursor-pointer transition rounded-lg flex font-bold text-center gap-4 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true"/>
  <LoadingIcon v-if="size === 'sm' && isLoading" stroke="4" size="46" color="#ffad32" />
</template>
