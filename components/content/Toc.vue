<script setup lang="ts">
import { type item } from '~/types/TocItem';

const props = defineProps<{
  items: Ref<item>[];
}>();
</script>

<template>
  <div class="wrapper">
    <h1 class="text-center font-semibold text-2xl font-[Times]">Content</h1>
    <ul class="menu bg-base-100 rounded-box w-56">
      <TocItem :items="props.items"></TocItem>
    </ul>
  </div>
</template>

<style scoped></style>
