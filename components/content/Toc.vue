<script setup lang="ts">
import { type item } from "~/types/TocItem";
const route = useRoute();
const props = defineProps<{
  page: any;
}>();
const TocItems = ref<Ref<item>[]>([]);
// const { data: page } = await useAsyncData(route.path, () =>
//   queryContent(route.path).findOne()
// );
TocItems.value = props.page?.body?.toc?.links.map((link) => {
  if (link.id === undefined) return [];
  return getTocItems(link);
}) as Ref<item>[];

function getTocItems(link: TocLink): Ref<item> {
  const ac = ref<boolean>(false);
  watch(
    () => route.hash,
    (val) => {
      if (val === "#" + link.id) {
        return (ac.value = true);
      }
      return (ac.value = false);
    },
    {
      immediate: true,
    }
  );

  if (link.children?.length === 0) {
    return ref({
      title: link.text,
      link: "#" + link.id,
      active: ac,
      child: [],
    }) satisfies Ref<item>;
  } else {
    const childList = link.children?.map(getTocItems);
    return ref({
      title: link.text,
      link: "#" + link.id,
      active: ac,
      child: childList ? childList : [],
    }) satisfies Ref<item>;
  }
}
</script>

<template>
  <div
    class="wrapper flex flex-col items-stretch justify-center border-4 border-base-200 border-dashed"
  >
    <h1 class="text-center font-semibold text-2xl font-[Times]">
      C&ensp;o&ensp;n&ensp;t&ensp;e&ensp;n&ensp;t
    </h1>
    <ul
      class="menu bg-base-100 rounded-box w-64 flex items-start justify-center"
    >
      <TocItem :items="TocItems"></TocItem>
    </ul>
  </div>
</template>

<style scoped></style>
