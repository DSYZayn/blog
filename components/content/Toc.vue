<script setup lang="ts">
import { type item } from '~/types/TocItem';

const props = defineProps<{
  items: Ref<item>[];
}>();

</script>

<template>
  <div class="wrapper flex flex-col items-stretch justify-center border-4 border-base-200 border-dashed">
    <h1 class="text-center font-semibold text-2xl font-[Times]">C&ensp;o&ensp;n&ensp;t&ensp;e&ensp;n&ensp;t</h1>
    <ul class="menu bg-base-100 rounded-box w-64 flex items-start justify-center">
      <TocItem :items="props.items"></TocItem>
    </ul>
  </div>
</template>

<style scoped></style>
