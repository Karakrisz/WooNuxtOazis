<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
  isCustomWidth?: boolean;
}

const { regularPrice, salePrice, isCustomWidth } = defineProps<ProductPriceProps>();
</script>

<template>
  <div class="flex gap-[15px] items-center">
    <span v-if="salePrice" class="line-through text-gray-700 text-[14px] uppercase" v-html="salePrice" />
    <span class="flex items-center gap-1">
      <span v-if="regularPrice" class="text-[20px] uppercase text-primary" v-html="regularPrice" />
      <span v-if="isCustomWidth" class="text-[20px] text-gray-600">/ méter</span>
    </span>
  </div>
</template>