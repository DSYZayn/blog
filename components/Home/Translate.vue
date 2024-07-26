<script setup>
onMounted(() => {
  translate.language.setLocal("chinese_simplified");
  translate.service.use("client.edge");
  const page = document.getElementById("page");
  translate.listener.start();
  translate.execute();
  const observer = new MutationObserver((mutations) => {
    translate.execute([page]);
  });
  observer.observe(page, {
    attributes: true,
    childList: true,
    characterData: true,
  });

  if (!import.meta.env.SSR) {
    const el = document.getElementById("translate");
    if (el) {
      const li = document.getElementById("transli");

      li?.appendChild(el);
    }
  }
});
</script>

<template></template>

<style scoped></style>
