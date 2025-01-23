<script setup>
onMounted(() => {
  translate.language.setLocal('chinese_simplified')
  translate.service.use('client.edge')
  translate.listener.start()
  translate.execute()
  if (!import.meta.env.SSR) {
    const el = document.getElementById('translate')
    if (el) {
      const li = document.getElementById('transli')
      li?.appendChild(el)
    }
  }
})
</script>

<style scoped></style>
