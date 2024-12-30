<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();

const links = [
  { text: "Főoldal", to: "/", prefetch: false },
  { text: "Rólunk", to: "/rolunk", prefetch: false },
  { text: "Galéria", to: "/galeria", prefetch: false },
  { text: "Étlap", to: "/products", prefetch: false },
  { text: "Kapcsolat", to: "/kapcsolat", prefetch: false },
];
</script>

<template>
  <div class="bg-primary flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-11/12 z-50 fixed overflow-x-hidden p-8">
    <Icon name="ion:close-outline" class="text-light-yellow absolute p-1 rounded-lg shadow-lg top-6 left-6 md:left-8 cursor-pointer hover:text-primary transition" size="34" @click="toggleMobileMenu(false)" />
    <SignInLink class="top-6 right-6 md:right-8 absolute" />

    <div class="flex flex-col items-center justify-center h-full gap-10">
      <ProductSearch class="h-fit w-full relative" />
      <nav class="flex flex-col items-center justify-center gap-10">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :class="[
          'cursor-pointer text-xl text-light-yellow transition hover:text-white uppercase ',
          link.class
        ]" active-class="underline underline-offset-4" :prefetch="link.prefetch">
          {{ link.text }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
