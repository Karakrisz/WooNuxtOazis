<script lang="ts" setup>
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';
import type { CurtainCustomData } from '~/types/curtain';

const route = useRoute();
const { storeSettings } = useAppConfig();
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();
const { t } = useI18n();
const slug = route.params.slug as string;

// Fetch product data
const { data } = await useAsyncGql('getProduct', { slug });
if (!data.value?.product) {
  throw showError({ statusCode: 404, statusMessage: t('messages.shop.productNotFound') });
}

// State management
const product = ref<Product>(data?.value?.product);
const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variation = ref<VariationAttribute[]>([]);
const indexOfTypeAny = computed<number[]>(() => checkForVariationTypeOfAny(product.value));
const attrValues = ref();
const customOptions = ref<CurtainCustomData>({
  fabric_width: '',
  fabric_length: '',
  sewing_type: '',
  fabric_price: 0,
  sewing_price: 0,
  total_custom_price: 0
});
const calculatedPrice = ref(0);

// Computed properties
const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE);
const isExternalProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.EXTERNAL);
const type = computed(() => activeVariation.value || product.value);

// Curtain specific computed properties
const isCustomWidth = computed(() => {
  return product.value?.productCategories?.nodes?.some(
    cat => cat.slug === 'szelesseg-meretre-vaghato'
  );
});

const isReadyMade = computed(() => {
  return product.value?.productCategories?.nodes?.some(
    cat => cat.slug === 'kesz'
  );
});

const getMetaValue = (key: string) => {
  return product.value?.metaData?.find(meta => meta.key === key)?.value;
};

const curtainSettings = computed(() => {
  if (!product.value) return null;

  return {
    minWidth: parseFloat(getMetaValue('_curtain_min_width') || '0'),
    sewingPrice: parseFloat(getMetaValue('_curtain_sewing_price') || '2'),
    hossz: parseFloat(getMetaValue('hossz') || '290'),
    basePrice: parseFloat(type.value?.regularPrice || '0')
  };
});

// Event handlers
const handlePriceUpdate = (newPrice: number) => {
  calculatedPrice.value = newPrice;
};

const handleOptionsUpdate = (options: CurtainCustomData) => {
  customOptions.value = options;
  console.log(options);
};

// Add to cart functionality
const selectProductInput = computed<AddToCartInput>(() => ({
  productId: type.value?.databaseId,
  quantity: quantity.value,
  variation: activeVariation.value ? attrValues.value : null,
  variationId: activeVariation.value?.databaseId ?? null
}));

const disabledAddToCart = computed<boolean>(() => {
  // const basicConditions = !type.value ||
  //   stockStatus.value === StockStatusEnum.OUT_OF_STOCK ||
  //   isUpdatingCart.value;

  // if (isVariableProduct.value && !activeVariation.value) {
  //   return true;
  // }

  // if (isCustomWidth.value) {
  //   const width = parseFloat(customOptions.value.fabric_width);
  //   const length = parseFloat(customOptions.value.fabric_length);
  //   const minWidth = curtainSettings.value?.minWidth || 0;
  //   const maxLength = curtainSettings.value?.hossz || 290;

  //   return Boolean(
  //     basicConditions ||
  //     !customOptions.value.fabric_width ||
  //     !customOptions.value.fabric_length ||
  //     !customOptions.value.sewing_type ||
  //     (width && width < minWidth) ||
  //     (length && length > maxLength)
  //   );
  // }

  // return Boolean(basicConditions);
  return false;
});

const addToCartWithCustomOptions = async () => {
  console.log(customOptions.value);
  const input: AddToCartInput = {
    ...selectProductInput.value,
    extraData: JSON.stringify({
      fabric_width: customOptions.value.width,
      fabric_length: customOptions.value.length,
      sewing_type: customOptions.value.sewingType,
      fabric_price: customOptions.value.fabricPrice,
      sewing_price: customOptions.value.sewingPrice,
      total_custom_price: calculatedPrice.value || parseFloat(type.value?.regularPrice || '0')
    })
  };

  await addToCart(input);
};

// Variation handling
const updateSelectedVariations = (variations: VariationAttribute[]): void => {
  if (!product.value.variations) return;

  attrValues.value = variations.map((el) => ({
    attributeName: el.name,
    attributeValue: el.value
  }));

  const clonedVariations = JSON.parse(JSON.stringify(variations));

  const getActiveVariation = product.value.variations?.nodes.filter((variation: any) => {
    if (variation.attributes) {
      indexOfTypeAny.value.forEach((index) => (clonedVariations[index].value = ''));
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(clonedVariations));
    }
  });

  if (getActiveVariation[0]) {
    activeVariation.value = getActiveVariation[0];
  }
};

// Stock status management
const stockStatus = computed(() => {
  if (isVariableProduct.value) {
    return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
  }
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});

const mergeLiveStockStatus = (payload: Product): void => {
  product.value.stockStatus = payload.stockStatus ?? product.value?.stockStatus;

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (product.value?.variations?.nodes[index]) {
      product.value.variations.nodes[index].stockStatus = variation.stockStatus;
    }
  });
};

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug });
    if (product) mergeLiveStockStatus(product as Product);
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;
    if (errorMessage) console.error(errorMessage);
  }
});

const productLength = computed(() => product.value?.metaData?.find(
  (meta) => meta.key === 'hossz'
)?.value || '');

const productWidth = computed(() => product.value?.metaData?.find(
  (meta) => meta.key === 'szelesseg'
)?.value || '');

const productColor = computed(() => product.value?.metaData?.find(
  (meta) => meta.key === 'szin'
)?.value || '');

const productType = computed(() => isCustomWidth.value ? 'Szélesség méretre vágható' : 'Kész');

const productDimensions = computed(() => {
  if (isReadyMade.value) {
    return `${productWidth.value} x ${productLength.value} cm`;
  }
  return '';
});
</script>

<template>
  <main class="container relative py-6">
    <div v-if="product">
      <SEOHead :info="product" />
      <Breadcrumb v-if="storeSettings.showBreadcrumbOnSingleProduct" :product class="mb-6" />

      <div class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24">
        <!-- Product Images -->
        <ProductImageGallery v-if="product.image" class="relative flex-1" :main-image="product.image" :gallery="product.galleryImages!" :node="type" :active-variation="activeVariation || {}" />
        <NuxtImg v-else class="relative flex-1 skeleton" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />

        <!-- Product Details -->
        <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between mb-4">
            <div class="flex-1">
              <h1 class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-semibold">
                {{ type.name }}
                <LazyWPAdminLink :link="`/wp-admin/post.php?post=${product.databaseId}&action=edit`">
                  Edit
                </LazyWPAdminLink>
              </h1>
              <StarRating v-if="storeSettings.showReviews" :rating="product.averageRating || 0" :count="product.reviewCount || 0" />
            </div>
          </div>

          <!-- Regular Price Display -->
          <div v-if="!isCustomWidth" class="mb-4">
            <ProductPrice :regular-price="type.regularPrice" :sale-price="type.salePrice" />
          </div>

          <!-- Product Info -->
          <div class="grid gap-2 my-8 text-sm empty:hidden">
            <div v-if="!isExternalProduct" class="flex items-center gap-2">
              <span class="text-stone-400">{{ $t('messages.shop.availability') }}: </span>
              <StockStatus :stock-status="stockStatus" @updated="mergeLiveStockStatus" />
            </div>

            <div v-if="storeSettings.showSKU && product.sku" class="flex items-center gap-2">
              <span class="text-stone-400">{{ $t('messages.shop.sku') }}: </span>
              <span>{{ product.sku || 'N/A' }}</span>
            </div>

            <div v-if="isReadyMade && productDimensions" class="flex items-center gap-2">
              <span class="text-stone-400">Méret: </span>
              <span>{{ productDimensions }}</span>
            </div>

            <div v-if="productLength && !isReadyMade" class="flex items-center gap-2">
              <span class="text-stone-400">Hossz: </span>
              <span>{{ productLength }} cm</span>
            </div>

            <div v-if="productColor" class="flex items-center gap-2">
              <span class="text-stone-400">Szín: </span>
              <span>{{ productColor }}</span>
            </div>

            <div v-if="productType" class="flex items-center gap-2">
              <span class="text-stone-400">Típus: </span>
              <span>{{ productType }}</span>
            </div>
          </div>

          <div class="mb-8 font-light prose" v-html="product.shortDescription || product.description" />

          <hr>

          <!-- Product Form -->
          <form @submit.prevent="addToCartWithCustomOptions">
            <!-- Variable Product Attributes -->
            <AttributeSelections v-if="isVariableProduct && product.attributes && product.variations" class="mt-4 mb-8" :attributes="product.attributes.nodes" :default-attributes="product.defaultAttributes" :variations="product.variations.nodes" @attrs-changed="updateSelectedVariations" />

            <!-- Curtain Calculator -->
            <CurtainCalculator v-if="curtainSettings" :product="product" :settings="curtainSettings" @update-price="handlePriceUpdate" @update-options="handleOptionsUpdate" />

            <!-- Calculated Price Display for Custom Width -->
            <!-- <div v-if="isCustomWidth && calculatedPrice > 0" class="mt-4">
              <ProductPrice :regular-price="calculatedPrice.toFixed(0)" is-calculated-price />
            </div> -->

            <!-- Add to Cart Section -->
            <div v-if="isVariableProduct || isSimpleProduct" class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0">
              <input v-model="quantity" type="number" min="1" aria-label="Quantity" class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none">
              <AddToCartButton class="flex-1 w-full md:max-w-xs" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }" />
            </div>

            <!-- External Product Link -->
            <a v-if="isExternalProduct && product.externalUrl" :href="product.externalUrl" target="_blank" class="rounded-lg flex font-bold bg-stone-800 text-white text-center min-w-[150px] p-2.5 gap-4 items-center justify-center focus:outline-none">
              {{ product?.buttonText || 'View product' }}
            </a>
          </form>

          <!-- Categories -->
          <div v-if="storeSettings.showProductCategoriesOnSingleProduct && product.productCategories" class="mt-8">
            <div class="grid gap-2 my-8 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-stone-400">{{ $t('messages.shop.category', 2) }}:</span>
                <div class="product-categories">
                  <NuxtLink v-for="category in product.productCategories.nodes" :key="category.slug" :to="`/product-category/${decodeURIComponent(category.slug)}`" class="hover:text-primary" :title="category.name">
                    {{ category.name }}<span class="comma">, </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <hr>
          </div>

          <!-- Additional Buttons -->
          <div class="flex flex-wrap gap-4 mt-8">
            <WishlistButton :product="product" />
            <ShareButton :product="product" />
          </div>
        </div>
      </div>

      <!-- Product Tabs -->
      <div v-if="product.description || product.reviews" class="my-32">
        <ProductTabs :product="product" />
      </div>

      <!-- Related Products -->
      <div v-if="product.related && storeSettings.showRelatedProducts" class="my-32">
        <div class="mb-4 text-xl font-semibold">
          {{ $t('messages.shop.youMayLike') }}
        </div>
        <ProductRow :products="product.related.nodes" class="grid-cols-1 md:grid-cols-4 lg:grid-cols-5" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.product-categories>a:last-child .comma {
  display: none;
}

input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}
</style>