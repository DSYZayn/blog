<script setup lang="ts">
import Giscus, { type Theme } from "@giscus/vue";
const route = useRoute()
const colorMode = useColorMode();

let giscusTheme: ComputedRef<Theme>;
if (!import.meta.env.SSR) {
  const baseurl = "https://zassets.cpolar.top";

  giscusTheme = computed(function (): Theme {
    return colorMode.value === "light"
      ? baseurl + "/giscus/light.css"
      : baseurl + "/giscus/dark.css";
  });
}
</script>

<template>
   <ClientOnly>
      <Giscus
        :key="route.path"
        repo="DSYZayn/blog"
        repoId="R_kgDOMY-YzQ"
        category="Announcements"
        categoryId="DIC_kwDOMY-Yzc4ChIhy"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        :theme="giscusTheme"
        lang="zh-CN"
        loading="lazy"
        class="scale-75 w-full xl:scale-100"
      >
      </Giscus>
      <template #fallback>
        Comment block lost...
      </template>
    </ClientOnly>
</template>

<style scoped>
</style>