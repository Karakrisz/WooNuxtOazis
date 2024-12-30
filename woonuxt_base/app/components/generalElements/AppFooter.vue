<script setup lang="ts"></script>

<template>
  <footer class="bg-primary">
    <div class="container py-16 gap-10 lg:gap-16 grid lg:grid-cols-4 text-[#fbfadd]">
      <div>
        <h6 class="text-xl font-medium mb-8">MENÜ</h6>
        <div class="flex flex-col gap-4">
          <NuxtLink class="">TERMÉKEK</NuxtLink>
          <NuxtLink class="">BELÉPÉS</NuxtLink>
          <NuxtLink class="">REGISZTRÁCIÓ</NuxtLink>
          <NuxtLink class="">PROFILOM</NuxtLink>
          <NuxtLink class="">KOSÁR</NuxtLink>
          <NuxtLink class="">PROFILOM</NuxtLink>
        </div>
      </div>

      <div class="">
        <h6 class=" text-xl font-medium mb-8">INFORMÁCIÓK</h6>
        <div class="flex flex-col gap-4">
          <NuxtLink to="/ASZF" class="">ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK</NuxtLink>
          <NuxtLink class="">ADATKEZELÉSI TÁJÉKOZTATÓ</NuxtLink>
          <NuxtLink class="">FIZETÉS</NuxtLink>
          <NuxtLink class="">SZÁLLÍTÁS</NuxtLink>
          <NuxtLink class="">GYAKRAN ISMÉTELT KÉRDÉSEK</NuxtLink>
          <NuxtLink class="">ELÉRHETŐSÉGEK</NuxtLink>
        </div>
      </div>

      <div class="">
        <h6 class="text-xl font-medium mb-8">ELÉRHETŐSÉG</h6>
        <div class="flex flex-col gap-4">
          <a href="tel:+36704266794" class=" flex items-center">
            <NuxtImg class="w-4 mr-2" src="/img/footer/mobile.svg" alt="Függöny Oázis" />
            +36 70 426 67 94
          </a>
          <p class="flex items-center">
            <NuxtImg class="w-4 mr-2 shrink-0" src="/img/footer/time.svg" alt="Függöny Oázis" />
            Telefonos ügyfélszolgálat: Munkanapokon 8:00 - 17:00
          </p>
          <a href="mailto:fuggonyoazis@gmail.com" class=" flex items-center">
            <NuxtImg class="w-4 mr-2" src="/img/footer/mail.svg" alt="Függöny Oázis" />
            fuggonyoazis@gmail.com
          </a>
        </div>
      </div>

      <div class="flex justify-center lg:justify-end items-center">
        <NuxtImg class="w-[60%]" src="img/logo.svg" alt="Függöny Oázis" />
      </div>
    </div>

    <div class="bg-dark px-16 py-4">
      <div class="container">
        <NuxtImg densities="x1" src="img/footer/digitalSeed.svg" alt="Függöny Oázis" />
      </div>
    </div>
  </footer>
</template>