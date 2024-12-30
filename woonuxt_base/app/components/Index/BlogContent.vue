<script setup lang="ts">
import { ref, computed } from 'vue';
import he from 'he';

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
}

const itemsPost = ref<Post[] | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

async function fetchPosts() {
  loading.value = true;
  try {
    const response = await fetch('https://fuggonyoazis.hu/api/public/json-posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    itemsPost.value = data;
  } catch (e) {
    error.value = (e as Error).message;
    console.error('Error fetching posts:', (e as Error).message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchPosts();
});

function getShortBody(body: string) {
  const decodedBody = he.decode(body);
  if (decodedBody.length > 100) {
    return decodedBody.substring(0, 100) + '...';
  }
  return decodedBody;
}
</script>

<template>
  <section>
    <div class="pb-8 container">
      <h4 class="py-[50px] uppercase font-light text-center text-2xl sm:text-4xl">BLOG</h4>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="post in itemsPost" :key="post.id" class="relative flex flex-col h-full">
          <NuxtImg class="w-full" :src="`https://fuggonyoazis.hu/api/public/storage/${post.image}`" :alt="post.title" />
          <div class="p-4 shadow-md flex flex-col">
            <h3 class="text-[#0a1310] font-semibold pb-3">
              {{ post.title }}
            </h3>

            <p class="text-base" v-html="getShortBody(post.body)" />

            <div class="flex items-center pt-4">
              <NuxtLink :to="`/posts/${post.id}`" class="text-dark font-medium underline hover:text-primary transition">
                Tovább olvasok
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>