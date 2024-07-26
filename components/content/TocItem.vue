<script setup lang="ts">
import { type item } from '~/types/TocItem';
const props = defineProps<{
    items: Ref<item>[]
}>();

</script>

<template>
    <li v-for="(item,idx) in props.items" :key="idx">
        <NuxtLink v-if="item.value.child.length === 0" :class="{active: item.value.active}" 
        :to="{
            hash:item.value.link
        }"
        exact
        >{{ item.value.title }}</NuxtLink>
        <li v-else>
            <details>
            <summary>
                <NuxtLink :class="{active: item.value.active}" 
                :to="{
                    hash:item.value.link
                }"
                exact
                >{{ item.value.title }}</NuxtLink>
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