<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  title: string;
  content: string;
}

const AccordionItems: AccordionItem[] = [
  { title: 'Kell-e regisztrálnom a vásárláshoz?', content: 'Tartalom 1' },
  {
    title: 'Okostelefonon és tableten is tudok vásárolni?',
    content: 'Tartalom 2',
  },
  { title: 'Hogy adhatom le a rendelésem?', content: 'Tartalom 3' },
  {
    title: 'Lehetséges e-mailben, vagy telefonon is rendelni?',
    content: 'Tartalom 4',
  },
  {
    title: 'Lehetséges e-mailben, vagy telefonon is rendelni?',
    content: 'Tartalom 5',
  },
];

const currentIndex = ref<number | null>(null);
</script>

<template>
  <section class="bg-light-pastel pt-[100px]">
    <div class="container">
      <h3 class="py-[50px] uppercase font-light text-center text-2xl sm:text-4xl">
        GYAKRAN ISMÉTELT KÉRDÉSEK
      </h3>

      <div class="flex flex-col">
        <div v-for="(item, index) in AccordionItems" :key="index" class="cursor-pointer" @click="currentIndex = currentIndex === index ? null : index">
          <div class="flex justify-between gap-2 items-center p-4 mb-4 border border-primary">
            <h3 class="font-semibold text-lg">
              {{ item.title }}
            </h3>
            <span class="transition-transform duration-300 ease-in-out" :class="{ 'rotate-180': currentIndex === index }">
              <NuxtImg class="w-5" src="/img/accordion/accordion-arrow.svg" alt="Függöny Oázis" />
            </span>
          </div>

          <div class="overflow-hidden transition-all duration-300 ease-in-out opacity-0 max-h-0" :class="{
            'opacity-100 max-h-20 mb-4 p-4 bg-primary': currentIndex === index
          }">
            <p class="text-light-yellow">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>

      <div class="py-14 text-center">
        <NuxtLink class="button button-primary w-fit mx-auto">
          ÖSSZES KÉRDÉS MEGTEKINTÉSE
        </NuxtLink>
      </div>
    </div>
  </section>
</template>