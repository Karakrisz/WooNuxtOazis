<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  title: string;
  content: string;
}

const AccordionItems: AccordionItem[] = [
  {
    title: 'Kell-e regisztrálnom a vásárláshoz?',
    content: 'A vásárláshoz nincs szükség regisztrációra.'
  },
  {
    title: 'Okostelefonon és tableten is tudok vásárolni?',
    content: 'Igen, minden eszközön elérhető web áruházunk.',
  },
  {
    title: 'Hogy adhatom le a rendelésem?',
    content: ' Rendelését a www.fuggonyoazis.hu  online felületén tudja leadni. A termékeket a kosárba helyezés gombbal tudja kiválasztani és ezután a pénztárnál a számlázási és szállítási adatok megadását követően tudja véglegesíteni a megrendelését.'
  },
  {
    title: 'Lehetséges e-mailben, vagy telefonon is rendelni?',
    content: 'Nem, sajnos ezeken a kommunikációs csatornákon nem lehetséges rendelést leadni.',
  },
  {
    title: 'Mikor kapom meg a rendelés visszaigazolását?',
    content: 'A megrendelés visszaigazolását e-mailben kapja meg a rendelés elküldését követően.',
  },
  {
    title: 'Nem kaptam meg a rendelésem visszaigazolását, mit tegyek?',
    content: 'Kérjük nézze meg a spam mappáját is, ha ott sem találja kérjük vegye fel velünk a kapcsolatot az elérhetőségeink egyikén. https://www.fuggonyoazis.hu/kapcsolat',
  },
  {
    title: 'Szállítás előtt felveszik velem a kapcsolatot ?',
    content: 'Igen a szállítmányozó cég felveszi Önnel a kapcsolatot 1-2 nappal a termék leszállítása előtt.',
  },
  {
    title: 'Kérhetem a szállítást külföldre?',
    content: 'Nem szállítunk csomagot külföldre.',
  },
  {
    title: 'Átvehetem a rendelésemet személyesen is?',
    content: 'Személyes átvételre egyenlőre nincs lehetőség, áruházunk online értékesítést folytat.',
  },
  {
    title: 'Mikor szállítják ki a megrendelésem?',
    content: 'A feladás időtartamát a termékeknél találja a termék leírásban, miközben ha több terméket rendel egy megrendelésben mindig a leghosszabb feladási időt kell alapul venni. A szállítási idő szállítási módtól függően 3-4 munkanapot vessz igénybe.',
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
        <div v-for="(item, index) in AccordionItems" :key="index" class="cursor-pointer"
          @click="currentIndex = currentIndex === index ? null : index">
          <div class="flex justify-between gap-2 items-center p-4 mb-4 border border-primary">
            <h3 class="font-semibold text-lg">
              {{ item.title }}
            </h3>
            <span class="transition-transform duration-300 ease-in-out"
              :class="{ 'rotate-180': currentIndex === index }">
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
        <NuxtLink to="/gyakorikerdesek" class="button button-primary w-fit mx-auto">
          ÖSSZES KÉRDÉS MEGTEKINTÉSE
        </NuxtLink>
      </div>
    </div>
  </section>
</template>