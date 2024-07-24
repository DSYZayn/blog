<script setup>
onMounted(async () => {
  await import('/translate.js')
    translate.language.setLocal('chinese_simplified');
    translate.service.use('client.edge');
    const page = document.getElementById('page')
    translate.listener.start()
    translate.execute()
    const observer = new MutationObserver((mutations)=>{
      translate.execute([page])
    })
    observer.observe(page, {
      attributes: true,
      childList: true,
      characterData: true
    })
})
</script>

<template>
</template>

<style scoped>

</style>