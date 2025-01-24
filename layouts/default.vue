<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>
<template>
  <div class="gd-container font-spacegrotesk">
    <header class="fixed w-full bg-[#F1F2F4] dark:bg-slate-950 z-10">
      <MainHeader />
    </header>
    <main>
      <div class="p-9" />
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
    <SpeedInsights />
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
