<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  title: string;
  content: string;
}

const AccordionItems: AccordionItem[] = [
  {
    title: 'Milyen fizetési módok közül választhatok?',
    content: 'Online vásárlás esetén fizethetsz online bankkártyával, vagy csomagküldés esetén készpénzes utánvéttel, illetve bankkártyás utánvéttel a futárnál.'
  },
  {
    title: 'Milyen bank és hitelkártyával fizethetek?',
    content: 'Mastercard, Maestro és Visa.',
  },
  {
    title: 'Hogyan kapom meg a számlát?',
    content: 'Számlát a csomagfeladás napján a rendelésnél megadott email címre küldjük ki PDF fájl formátumban.'
  },
  {
    title: 'Mit tegyek ha a futárszolgálat meghozza az árut?',
    content: 'Az áru átvételekor a Vevő köteles ellenőrizni, hogy a küldemény eredeti csomagolása nem sérült-e, és hogy a küldeményen nincsenek-e károsodásra utaló nyilvánvaló nyomok. Az áru átvételi jegyzőkönyvének aláírásával a Vevő igazolja, hogy a küldeményt sérülés mentesen veszi át. Amennyiben az átvételkor a küldeményen károsodásra utaló nyilvánvaló nyomok vannak, a Vevő megtagadja a küldemény átvételét.',
  },
  {
    title: 'El tudok állni a vásárlási szerződéstől?',
    content: 'Az áru visszaszolgáltatása – A szerződéstől való elállás A fogyasztónak minősülő Vevőnek joga van a fogyasztó és a vállalkozás közötti részletes szabályairól szóló 45/2014 (II.26) Kormányrendelet 20.§-a értelmében a szerződéstől az áru 4.5. pont szerinti átvételétől számított 14 napon belül indoklás nélkül elállni. A terméktől csak eredeti bontatlan állapotban tudd elállni.'
  },
  {
    title: 'Hogy tudok terméket reklamálni?',
    content: 'Reklamációs igény benyújtása előtt kérjük vegye fel velünk a kapcsolatot az elérhetőségeink egyikén. https://www.fuggonyoazis.hu/kapcsolat/ A reklamáció benyújtásához a következőkre lesz szüksége  számla a vásárlásról- reklamációs dokumentum/ reklamált termék  fényképes dokumentáció'
  },
  {
    title: 'Ingyenes a visszaküldés?',
    content: 'Az árukat a saját költségén küldi vissza. A szállítás költségét csak abban az esetben térítjük vissza, ha jogos a reklamáció.'
  },
  {
    title: 'Milyen formában kaphatom vissza a pénzt?',
    content: 'A kártyás fizetés esetén, az összeget a vásárlásnál használt bankkártyára utaljuk vissza . Az utánvétes fizetés esetén a regisztrált címre kézbesítjük. '
  },
  {
    title: 'Nem kaptál választ, vagy szeretnél nekünk üzenni?',
    content: 'Vedd fel velünk a kapcsolatot itt és szívesen válaszolunk bármilyen kérdésedre! '
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
        <NuxtLink to="/kapcsolat" class="button button-primary w-fit mx-auto">
          KAPCSOLAT
        </NuxtLink>
      </div>
    </div>
  </section>
</template>