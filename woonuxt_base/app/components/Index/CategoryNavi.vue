<script setup>
const rooms = [
  {
    name: 'FÜRDŐSZOBA',
    icon: '/img/navigation/furdo.svg',
    link: '/product-category/furdoszoba'           
  },
  {
    name: 'HÁLÓSZOBA',
    icon: '/img/navigation/halo.svg',
    link: '/product-category/haloszoba'             
  },
  {
    name: 'NAPPALI',
    icon: '/img/navigation/nappali.svg',
    link: '/product-category/nappali'          
  },
  {
    name: 'KONYHA',
    icon: '/img/navigation/konyha.svg',
    link: '/product-category/konyhai'          
  },
  {
    name: 'IRODA',
    icon: '/img/navigation/iroda.svg',
    link: '/'            
  },
  {
    name: 'GYEREKSZOBA',
    icon: '/img/navigation/gyerek.svg',
    link: '/'      
  }
]
</script>

<template>
  <section class="py-[100px] px-4">
    <div class="container mx-auto">
      <h3 class="text-center font-light uppercase pb-[50px] text-2xl sm:text-4xl mb-8">
        KERESSEN SZOBA SZERINT
      </h3>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <NuxtLink v-for="room in rooms" :key="room.name" :to="room.link"
          class="cursor-pointer bg-primary hover:bg-primary-dark transition p-6 py-[50px] flex flex-col items-center justify-center hover:scale-105">
          <NuxtImg :src="room.icon" :alt="room.name + ' ikon'" class="w-[79px] h-[79px] mb-2" />
          <h4 class="text-white text-xl 2xl:text-2xl uppercase font-medium">
            {{ room.name }}
          </h4>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
