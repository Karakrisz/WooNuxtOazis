<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  phonenumber: '',
  subject: '',
  message: '',
});

const sendEmail = () => console.log(form.value);
</script>

<template>
  <section>
    <div class="relative">
      <div class="grid lg:grid-cols-2 container relative z-10">
        <div class="bg-white sm:p-[35px]" style="box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);">
          <div class="border border-primary p-[35px]">
            <h5 class="text-3xl font-light">KÉRDÉSE VAN?</h5>
            <h6 class="text-3xl font-medium mb-1">KERESSEN MINKET BIZALOMMAL</h6>
            <form @submit.prevent="sendEmail">
              <div class="my-4">
                <input id="name" v-model="form.name" type="text" placeholder="Név*" required class="w-full px-4 py-4 border border-primary placeholder-primary">
              </div>
              <div class="my-4">
                <input id="email" v-model="form.email" type="email" placeholder="E-mail cím *" required class="w-full px-4 py-4 border border-primary placeholder-primary">
              </div>
              <div class="my-4">
                <input id="phonenumber" v-model="form.phonenumber" type="text" placeholder="Telefonszám" required class="w-full px-4 py-4 border border-primary placeholder-primary">
              </div>
              <div class="my-4">
                <input id="subject" v-model="form.subject" type="text" placeholder="Tárgy*" required class="w-full px-4 py-4 border border-primary placeholder-primary">
              </div>
              <div class="my-4">
                <textarea id="message" v-model="form.message" rows="9" placeholder="Üzenet..." required class="w-full px-4 py-4 border border-primary placeholder-primary" />
              </div>
              <p class="mb-4">A küldés gombra kattintva elfogadom az <span class="underline hover:text-primary cursor-pointer transition">Adatkezelési tájékoztatót.</span></p>
              <button type="submit" class="button button-primary">
                Küldés
                <NuxtImg src="/img/navigation/mail-arrow.svg" alt="Függöny Oázis" class="relative -right-1 w-4" />
              </button>
            </form>
          </div>
        </div>
        <div class="bg-white">
          <NuxtImg src="/img/navigation/navigation.webp" alt="Függöny Oázis" class="w-full h-full object-cover lg:block hidden" />
        </div>
      </div>
      <div class="h-full w-full bg-primary absolute left-0 top-[100px]" />
    </div>
  </section>
</template>