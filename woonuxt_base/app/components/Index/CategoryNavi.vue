<script setup>
const rooms = [
  { name: 'FÜRDŐSZOBA', icon: '/img/navigation/furdo.svg' },
  { name: 'HÁLÓSZOBA', icon: '/img/navigation/halo.svg' },
  { name: 'NAPPALI', icon: '/img/navigation/nappali.svg' },
  { name: 'KONYHA', icon: '/img/navigation/konyha.svg' },
  { name: 'IRODA', icon: '/img/navigation/iroda.svg' },
  { name: 'GYEREKSZOBA', icon: '/img/navigation/gyerek.svg' },
]
</script>

<template>
  <section class="py-[100px] px-4">
    <div class="container mx-auto">
      <h3 class="text-center font-light uppercase pb-[50px] text-2xl sm:text-4xl mb-8">
        KERESSEN SZOBA SZERINT
      </h3>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div v-for="room in rooms" :key="room.name" class="cursor-pointer bg-primary hover:bg-primary-dark transition p-6 py-[50px] flex flex-col items-center justify-center hover:scale-105">
          <NuxtImg :src="room.icon" :alt="room.name" class="w-[79px] h-[79px] mb-2" />
          <h4 class="text-white text-xl 2xl:text-2xl uppercase font-medium">
            {{ room.name }}
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>