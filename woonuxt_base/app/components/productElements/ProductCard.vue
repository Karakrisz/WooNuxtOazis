<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';
import type { Product } from '~/types';

const route = useRoute();
const { storeSettings } = useAppConfig();
const { addToCart, isUpdatingCart } = useCart();

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute?.value?.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0]?.image?.producCardSourceUrl || activeColorImage[0]?.image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});

const isCustomWidth = computed(() => {
  return props.node?.productCategories?.nodes?.some(
    cat => cat.slug === 'szelesseg-meretre-vaghato'
  );
});

const isReady = computed(() => {
  return props.node?.productCategories?.nodes?.some(
    cat => cat.slug === 'kesz'
  );
});

const productLength = computed(() => props.node?.metaData?.find(
  (meta) => meta.key === 'hossz'
)?.value || '');
const productWidth = computed(() => props.node?.metaData?.find(
  (meta) => meta.key === 'szelesseg'
)?.value || '');
const productColor = computed(() => props.node?.metaData?.find(
  (meta) => meta.key === 'szin'
)?.value || '');
const productType = computed(() => isCustomWidth.value ? 'Szélesség méretre vágható' : 'Kész');
const productDimensions = computed(() => {
  if (isReady.value) {
    return `${productWidth.value} x ${productLength.value} cm`;
  }
  return '';
});
</script>

<template>
  <div class="flex flex-col bg-white" style="box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);">
    <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name" class="w-full h-[320px] relative overflow-hidden grow-0">
      <NuxtImg v-if="imagetoDisplay" :src="imagetoDisplay" :alt="node.image?.altText || node.name || 'Product image'" :title="node.image?.title || node.name" :loading="index <= 3 ? 'eager' : 'lazy'" class="object-cover min-h-full min-w-full transition hover:scale-105 duration-300" placeholder placeholder-class="blur-xl" />
      <SaleBadge :node class="absolute top-2 right-2" />
    </NuxtLink>

    <div class="p-[25px] flex flex-col justify-between flex-1 gap-[25px]">
      <div class="flex-1">
        <NuxtLink class="leading-tight text-[24px] font-semibold hover:text-stone-700 transition" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
          {{ node.name }}
        </NuxtLink>
        <ProductPrice class="text-sm mt-2" :is-custom-width="!isReady" :sale-price="node.salePrice" :regular-price="node.regularPrice" />

        <!-- Product Specifications -->
        <div class="mt-4 space-y-2 border-l-4 pl-2 text-xs" :class="node.stockStatus === 'IN_STOCK' ? 'border-[#B0BBA2]' : 'border-[#D47D7D]'">
          <div v-if="isReady && productDimensions" class="flex gap-2">
            <span>Méret:</span>
            <span class="font-medium">{{ productDimensions }}</span>
          </div>
          <div v-if="productLength && !isReady" class="flex gap-2">
            <span>Hossz:</span>
            <span class="font-medium">{{ productLength }} cm</span>
          </div>
          <div v-if="productColor" class="flex gap-2">
            <span>Szín:</span>
            <span class="font-medium">{{ productColor }}</span>
          </div>
          <div v-if="productType" class="flex gap-2">
            <span>Típus:</span>
            <span class="font-medium">{{ productType }}</span>
          </div>
        </div>

        <div class="mt-4">
          <span v-if="node.stockStatus === 'IN_STOCK'" class="text-sm flex items-center gap-2">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_533_23)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1.13333C7.5326 1.13333 6.57466 1.32388 5.6809 1.69409C4.78713 2.0643 3.97504 2.60692 3.29098 3.29098C2.60692 3.97504 2.0643 4.78713 1.69409 5.6809C1.32388 6.57466 1.13333 7.5326 1.13333 8.5C1.13333 9.4674 1.32388 10.4253 1.69409 11.3191C2.0643 12.2129 2.60692 13.025 3.29098 13.709C3.97504 14.3931 4.78713 14.9357 5.6809 15.3059C6.57466 15.6761 7.5326 15.8667 8.5 15.8667C10.4538 15.8667 12.3275 15.0905 13.709 13.709C15.0905 12.3275 15.8667 10.4538 15.8667 8.5C15.8667 6.54624 15.0905 4.6725 13.709 3.29098C12.3275 1.90946 10.4538 1.13333 8.5 1.13333ZM5.24719 0.647024C6.27846 0.219859 7.38376 0 8.5 0C10.7543 3.3776e-08 12.9163 0.895533 14.5104 2.48959C16.1045 4.08365 17 6.24566 17 8.5C17 10.7543 16.1045 12.9163 14.5104 14.5104C12.9163 16.1045 10.7543 17 8.5 17C7.38376 17 6.27846 16.7801 5.24719 16.353C4.21592 15.9258 3.27889 15.2997 2.48959 14.5104C1.70029 13.7211 1.07419 12.7841 0.647024 11.7528C0.219859 10.7215 0 9.61624 0 8.5C0 7.38376 0.219859 6.27846 0.647024 5.24719C1.07419 4.21592 1.70029 3.27889 2.48959 2.48959C3.27889 1.70029 4.21592 1.07419 5.24719 0.647024ZM13.434 6.63403L7.96811 12.0999L4.17056 8.93532L4.8961 8.06467L7.89856 10.5667L12.6326 5.83264L13.434 6.63403Z" fill="#1C362B" />
              </g>
              <defs>
                <clipPath id="clip0_533_23">
                  <rect width="17" height="17" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Raktáron
          </span>
          <span v-else class="text-sm text-disabled flex items-center gap-2">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 15.8667C12.5685 15.8667 15.8667 12.5685 15.8667 8.5C15.8667 4.4315 12.5685 1.13333 8.5 1.13333C4.4315 1.13333 1.13333 4.4315 1.13333 8.5C1.13333 12.5685 4.4315 15.8667 8.5 15.8667ZM8.5 17C13.1944 17 17 13.1944 17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5C0 13.1944 3.80558 17 8.5 17Z" fill="#B5B5B5" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3333 12.4666L4.53333 5.66662L5.33472 4.86523L12.1347 11.6652L11.3333 12.4666Z" fill="#B5B5B5" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4667 5.66667L5.66668 12.4667L4.8653 11.6653L11.6653 4.86528L12.4667 5.66667Z" fill="#B5B5B5" />
            </svg>
            Nincs raktáron
          </span>
        </div>

        <div class="text-[14px] leading-[150%] flex-1" v-html="node.shortDescription" />
      </div>

      <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name" class="w-full button button-primary">
        MEGRENDELÉS
      </NuxtLink>
    </div>
  </div>
</template>