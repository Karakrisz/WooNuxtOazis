<!-- components/CartItemCustomFields.vue -->
<script setup>
const { item } = defineProps({
  item: { type: Object, required: true },
});

const customFields = computed(() => {
  if (!item?.extraData) return null;

  const fields = {
    fabric_width: { label: 'Szélesség (cm)', value: null },
    fabric_length: { label: 'Hosszúság (cm)', value: null },
    sewing_type: { label: 'Varrás típusa', value: null },
    fabric_price: { label: 'Anyag ár', value: null },
    sewing_price: { label: 'Varrás ár', value: null }
  };

  item?.extraData.forEach(data => {
    if (fields[data.key]) {
      fields[data.key].value = data.value;
    }
  });

  return Object.values(fields).filter(field => field.value !== null);
});
</script>

<template>
  <div v-if="customFields?.length" class="text-sm text-stone-500 -mt-4 mb-4">
    <div v-for="field in customFields" :key="field.label" class="flex gap-2">
      <span>- </span>
      <span class="font-medium">{{ field.label }}:</span>
      <span>{{ field.value }}</span>
    </div>
  </div>
</template>