<script setup>
import { ref, watch } from 'vue'

const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching()
const searchQuery = ref(getSearchQuery())

const reset = () => {
  clearSearchQuery()
  searchQuery.value = ''
}

watch(getSearchQuery, (value) => {
  if (!value) reset()
})

const handleSubmit = () => {
  setSearchQuery(searchQuery.value)
}
</script>

<template>
  <form class="relative items-center rounded-[63px] shadow-sm" @submit.prevent="handleSubmit">
    <input v-model="searchQuery" type="text" :placeholder="$t('messages.shop.searchProducts')" class="z-0 placeholder:text-[#0A1310]/30 inline-flex items-center w-full pl-[25px] p-2 pr-12 text-dark rounded-[63px] outline-none bg-light-yellow h-[40px] ring-2 ring-transparent transition border-none focus:ring-amber-500">
    <span v-if="searchQuery" class="absolute z-10 top-1/2 -translate-y-1/2 pt-1 right-14 text-xs rounded cursor-pointer text-gray-600 hover:text-gray-900 transition" @click="reset">
      <Icon name="ion:close-outline" size="18" />
    </span>
    <button type="submit" class="absolute z-10 right-2  px-1.5 pt-1 top-1/2 -translate-y-1/2 transform transition cursor-not-allowed" :class="{ 'bg-light-pastel-green rounded-full hover:brightness-90 !cursor-pointer': searchQuery?.length >= 2 }">
      <Icon name="ph:magnifying-glass" size="24" :class="searchQuery?.length >= 2 ? 'text-primary-dark' : 'text-disabled '" />
    </button>
  </form>
</template>