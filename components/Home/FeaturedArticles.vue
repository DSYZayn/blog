<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      RECENT ARTICLES
    </h2>
    <ul class="space-y-16">
      <li>
        <div class="indicator">
          <span
            class="indicator-item indicator-start badge badge-accent"
          >置顶</span>
          <AppArticleCard :article="topArticle as any" />
        </div>
      </li>
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        label="All Articles &rarr;"
        to="/articles"
        variant="link"
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: topArticle } = await useAsyncData("article-ontop", () =>
  queryContent("/articles")
    .where({
      ontop: {
        $eq: true,
      },
    })
    .only(["title", "description", "published", "modified", "slug", "_path"])
    .findOne()
);

const { data: articles } = await useAsyncData("articles-home", () =>
  queryContent("/articles")
    .where({
      ontop: {
        $ne: true,
      },
    })
    .sort({ published: -1 })
    .limit(3)
    .only(["title", "description", "published", "modified", "slug", "_path"])
    .find()
);
</script>
