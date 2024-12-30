<script setup lang="ts">
const { viewer, avatar, logoutUser, isPending, wishlistLink } = useAuth();
const linkTitle = computed<string>(() => viewer.value?.username || 'Sign In');
</script>

<template>
  <NuxtLink to="/my-account" :title="linkTitle" class="inline-flex items-center">
    <Transition name="pop-in" mode="out-in">
      <span v-if="avatar" class="relative avatar shrink-0 pr-6">
        <img :src="avatar" class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto" width="32" height="32" :alt="linkTitle">
        <div class="account-dropdown">
          <NuxtLink :to="wishlistLink" class="hover:bg-stone-100">
            <Icon name="ion:heart-outline" size="16" /><span>Kívánságlista</span>
          </NuxtLink>
          <NuxtLink to="/my-account" class="hover:bg-stone-100">
            <Icon name="ion:person-outline" size="16" /><span>Profil</span>
          </NuxtLink>
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <LoadingIcon v-if="isPending" size="16" />
            <Icon v-else name="ion:log-out-outline" size="16" />
            <span>Kijelentkezés</span>
          </button>
        </div>
      </span>
      <div v-else class="flex gap-3 items-center bg-light-yellow hover:brightness-90 transition rounded-[63px] h-[40px] px-4">
        <span class="text-xl lg:block hidden">Bejelentkezés</span>
        <Icon name="ph:user" size="36" />
      </div>
    </Transition>
  </NuxtLink>
</template>

<style scoped lang="postcss">
.pop-in-enter-active,
.pop-in-leave-active {
  transition: transform 0.3s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transform: scale(0);
}

.avatar {
  .account-dropdown {
    @apply absolute gap-2 top-9 right-4 z-50 p-2 bg-white border border-stone-200 rounded-lg shadow-lg text-sm text-stone-700 hidden;

    a,
    button {
      @apply flex gap-2 items-center p-2 rounded whitespace-nowrap min-w-[200px];
    }
  }

  &:hover .account-dropdown {
    @apply grid;
  }
}
</style>
