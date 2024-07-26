<script setup>
// if(!import.meta.env.SSR){
//   const nuxtApp = useNuxtApp()
//   nuxtApp.provide('baseurl', window.location.origin)
// }

</script>
<template>
    <NuxtLoadingIndicator color="#14b8a6" />
    <AppNavbar />
    <div class="h-32"></div>
    <UContainer id="page" class="relative">
      <NuxtPage :page-key="route => route.path"/>
    </UContainer>
    <div class="h-32"></div>
    <AppFooter />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
