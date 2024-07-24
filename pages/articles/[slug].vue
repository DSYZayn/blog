<template>
  <NuxtLayout name="doc">
    <template #doc>
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
    </template>
    <template #toc>
      <Toc :items="TocItems ? TocItems:[]"></Toc>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { type item } from "~/types/TocItem";
import { type RouteLocationNormalizedLoadedGeneric } from "#vue-router";
const route = useRoute();
const { slug } = route.params;
useSeoMeta({
  ogImage: `https://fayazahmed.com/articles/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: ["Zayn"],
});

const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);

function getTocItems(
  link: TocLink,
): Ref<item> {
  if (link.children?.length === 0) {
    console.log("link no children.");
    const ac = ref<boolean>(false);
    watch(
      () => route.hash,
      (val) => {
        if (val === "#" + link.id) {
          return (ac.value = true);
        }
        return (ac.value = false);
      }
    );
    return ref({
      title: link.text,
      link: route.path + "#" + link.id,
      active: ac,
      child: [],
    }) satisfies Ref<item>;
  } else {
    return ref({
      title: link.text,
      link: "",
      active: false,
      child: link.children?.map(getTocItems)!,
    }) satisfies Ref<item>;
  }
}
const TocItems = page.value?.body?.toc?.links.map((link) => {
  return getTocItems(link);
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
