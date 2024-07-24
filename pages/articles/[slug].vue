<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
  </main>
  <div class="fixed toc top-24 -right-52 -translate-x-full" ref="toc">
    <Toc v-if="isTocShow" :items="TocItems"></Toc>
  </div>
</template>
<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { type item } from "~/types/TocItem";
const route = useRoute();
const isTocShow = ref<boolean>(false);

useSeoMeta({
  twitterCard: "summary_large_image",
  articleAuthor: ["Zayn"],
});
const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);
const TocItems = ref<Ref<item>[]>([]);

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
      immediate:true
    }
  );

  if (link.children?.length === 0) {
    return ref({
      title: link.text,
      link: "#" + encodeURI(link.id),
      active: ac,
      child: [],
    }) satisfies Ref<item>;
  } else {
    const childList = link.children?.map(getTocItems);
    return ref({
      title: link.text,
      link: "#" + encodeURI(link.id),
      active: ac,
      child: childList ? childList : [],
    }) satisfies Ref<item>;
  }
}
onBeforeMount(async () => {
  TocItems.value = page.value?.body?.toc?.links.map((link) => {
    return getTocItems(link);
  }) as Ref<item>[];
  isTocShow.value = true;
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
