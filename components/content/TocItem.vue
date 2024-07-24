<script setup lang="ts">
import { type item } from '~/types/TocItem';
const props = defineProps<{
  items: Ref<item>[];
}>();

</script>

<template>
    <li v-for="(item,idx) in props.items" :key="idx">
        <a v-if="item.value.child.length === 0" :class="{active: item.value.active}" :href="item.value.link">{{ item.value.title }}</a>
        <li v-else>
            <details>
            <summary>
                <a :class="{active: item.value.active}" :href="item.value.link">{{ item.value.title }}</a>
            </summary>
            <ul>
                <TocItem :items="item.value.child"></TocItem>
            </ul>
            </details>
        </li>
    </li>
</template>

<style scoped>

</style>