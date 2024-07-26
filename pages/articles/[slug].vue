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
    <div class="invisible md:visible fixed toc top-36 right-3" ref="toc">
      <ClientOnly>
        <ContentQuery :path="route.path" find="one" v-slot="{ data }">
          <Toc :page="data"></Toc>
        </ContentQuery>
      </ClientOnly>
      <AppZGiscus />
    </div>
  </main>
</template>
<script setup lang="ts">
const route = useRoute();

useSeoMeta({
  twitterCard: "summary_large_image",
  articleAuthor: ["Zayn"],
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
