<script setup lang="ts">
const links = [
  { name: 'Függöny', link: '/', prefetch: true },
  { name: 'Lakástextil', link: '/' },
  { name: 'Sötétítő', link: '/', prefetch: true },
  { name: 'Rövidáru', link: '/' },
  { name: 'Akciók', link: '/', class: 'font-bold' },
  { name: 'Kapcsolat', link: '/' },
];
</script>

<template>
  <header class="z-20 top-0">
    <div class="h-[40px] hidden sm:flex bg-light-pastel text-dark items-center">
      <div class="container flex items-center gap-[30px] text-sm ">
        <div class="flex gap-2.5 items-center">
          <Icon class="w-5 h-5" name="ph:phone" />
          <span>+36 70 426 67 94</span>
        </div>
        <div class="flex gap-2.5">
          <Icon class="w-5 h-5" name="ph:envelope" />
          <a href="mailto:fuggonyoazis@gmail.com">fuggonyoazis@gmail.com</a>
        </div>
      </div>

    </div>
    <div class="bg-dark-green">
      <div class="container flex justify-between items-center py-3 gap-4 sm:gap-10">
        <MenuTrigger class="lg:hidden shrink-0" />
        <div class="w-full flex lg:gap-28 gap-10">
          <NuxtLink to="/" class="shrink-0">
            <NuxtImg src="/img/logo.svg" class="w-[100px] sm:w-[160px]" />
          </NuxtLink>
          <ProductSearch class="hidden md:inline-flex flex-1 max-w-xl" />
        </div>

        <div class="flex gap-4">
          <SignInLink class="sm:flex hidden" />
          <CartTrigger />
        </div>
      </div>
    </div>
    <div class="bg-light-green h-[40px] hidden lg:flex">
      <div class="gap-16 justify-between flex items-center container ">
        <NuxtLink v-for="link in links" :key="link.name" :to="link.link" class="uppercase text-light-yellow hover:text-light-pastel-green transition" :class="link.class">{{ link.name }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
