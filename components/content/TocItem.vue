<script setup lang="ts">
import { type item } from '~/types/TocItem';
const props = defineProps<{
  items: Ref<item>[];
}>();
</script>

<template>
    <li v-for="(item,idx) in items" :key="idx">
        <a v-if="item.value.child.length === 0" :class="{active: item.value.active}">{{ item.value.title }}</a>
        <li v-else>
        <details>
          <summary :class="{active: item.value.active}">{{ item.value.child }}</summary>
          <ul>
            <TocItem :items="item.value.child"></TocItem>
          </ul>
        </details>
      </li>
      </li>
</template>

<style scoped>

</style>