<template>
    <section class="relative z-10 w-full min-h-[600px] h-full md:h-[800px] overflow-hidden">
        <NuxtImg src="/img/hero-bg.jpg" format="webp" class="absolute inset-0 object-cover w-full h-full pointer-events-none" />
        <div class="container relative z-10 h-full flex items-center justify-end p-4">
            <div class="bg-light-green p-16 h-fit md:w-[768px] min-h-[550px] md:min-h-[450px] md:h-[450px] relative">
                <!-- Inner border -->
                <div class="absolute inset-6 border border-light-yellow" />

                <!-- Content wrapper with transition -->
                <div class="h-full flex flex-col relative">
                    <Transition name="fade" mode="out-in">
                        <div :key="currentSlide" class="flex flex-col h-full">
                            <h2 class="text-2xl sm:text-3xl md:text-4xl font-light text-light-yellow mb-4 md:mb-6">
                                <span v-html="formatTitle(slides[currentSlide].title)" />
                            </h2>
                            <p class="text-light-yellow text-sm sm:text-base mb-6 md:mb-8">{{ slides[currentSlide].description }}</p>
                            <button class="button hover:brightness-90 bg-light-yellow w-fit transition">
                                {{ slides[currentSlide].buttonText }}
                            </button>
                        </div>
                    </Transition>
                </div>

                <!-- Paginator -->
                <div class="absolute bottom-8 right-8 flex items-center gap-2 z-10">
                    <button class="text-white p-1 sm:p-2 hover:scale-110 transition-transform shrink-0" @click="prevSlide">
                        <span class="sr-only">Previous</span>
                        &#x2190;
                    </button>
                    <div class="flex items-center gap-1">
                        <div v-for="(_, index) in slides" :key="index" class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer" :class="index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'" @click="currentSlide = index" />
                    </div>
                    <button class="text-white p-1 shrink-0 sm:p-2 hover:scale-110 transition-transform" @click="nextSlide">
                        <span class="sr-only">Next</span>
                        &#x2192;
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const currentSlide = ref(0)

// Function to format title and make PRÉMIUM bold
const formatTitle = (title) => {
    return title.replace('PRÉMIUM', '<span class="font-bold">PRÉMIUM</span>')
}

const slides = ref([
    {
        title: "KIZÁRÓLAG PRÉMIUM ALAPANYOGOKBÓL DOLGOZUNK",
        description: "Minden termékünket kizárólag első osztályú szövetek felhasználásával készítjük, így garantálva otthona számára a stílus és minőség tökéletes harmóniáját. Válasszon boltunkat, ahol a kifinomultság és tartósság találkozik, hogy otthonát a lehető legjobban kiegészíthesse.",
        buttonText: "TOVÁBB"
    },
    {
        title: "MINŐSÉGI TEXTILEK OTTHONÁBA",
        description: "Fedezze fel prémium textilkollekciónkat, amely tökéletes összhangot teremt otthonában. Minden darab gondosan válogatott, hogy megfeleljen a legmagasabb elvárásoknak.",
        buttonText: "FEDEZZE FEL"
    },
    {
        title: "EGYEDI MEGOLDÁSOK",
        description: "Személyre szabott megoldásainkkal segítünk megtalálni az Ön otthonába tökéletesen illő textileket. Szakértő csapatunk minden részletre odafigyel.",
        buttonText: "KAPCSOLAT"
    }
])

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
    currentSlide.value = currentSlide.value === 0
        ? slides.value.length - 1
        : currentSlide.value - 1
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>