<script setup lang="ts">
const { setProducts, updateProductList } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const allProducts = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  
  try {
    const response = await fetch('https://apioazis.hu/restapi/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetAllProducts {
            products(first: 1000, where: { status: "publish" }) {
              nodes {
                id
                databaseId
                name
                slug
                type
                ... on SimpleProduct {
                  price
                  regularPrice
                  salePrice
                  onSale
                  stockStatus
                  image { sourceUrl altText }
                  productCategories { nodes { id name slug } }
                }
                ... on VariableProduct {
                  price
                  regularPrice
                  salePrice
                  onSale
                  stockStatus
                  image { sourceUrl altText }
                  productCategories { nodes { id name slug } }
                }
              }
            }
          }
        `
      })
    });
    
    const result = await response.json();
    
    if (result.data?.products?.nodes) {
      allProducts.value = result.data.products.nodes;
      setProducts(allProducts.value);
      if (!isQueryEmpty.value) updateProductList();
    }
  } catch (error) {
    console.error('Hiba:', error);
  } finally {
    isLoading.value = false;
  }
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useHead({
  title: `Termékek`,
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div v-if="!isLoading">
    <div v-if="allProducts.length" class="container flex items-start gap-16">
      <Filters v-if="storeSettings.showFilters" />
      <div class="w-full">
        <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown v-if="storeSettings.showOrderByDropdown" class="hidden md:inline-flex" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
        <ProductGrid />
      </div>
    </div>
    <NoProductsFound v-else>Could not fetch products from your store. Please check your configuration.</NoProductsFound>
  </div>
  <div v-else class="container flex items-start gap-16 animate-pulse">
    <div class="bg-gray-200 w-[200px] h-[300px] mt-6 hidden sm:block"/>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg p-6 shadow-sm">
        <div class="aspect-square mb-4 bg-gray-200 rounded-lg"/>
        <div class="h-8 bg-gray-200 rounded mb-4"/>
        <div class="space-y-2 mb-4">
          <div class="h-4 bg-gray-200 rounded w-3/4"/>
          <div class="h-4 bg-gray-200 rounded w-full"/>
          <div class="h-4 bg-gray-200 rounded w-2/3"/>
        </div>
        <div class="flex items-center justify-between">
          <div class="h-6 w-24 bg-gray-200 rounded"/>
          <div class="h-10 w-10 bg-gray-200 rounded-full"/>
        </div>
      </div>
    </div>
  </div>
</template>