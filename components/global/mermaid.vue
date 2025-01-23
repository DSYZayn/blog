<script setup lang="ts">
const show = ref(false)

const { $mermaid } = useNuxtApp()

onMounted(async () => {
  show.value = true
  $mermaid().initialize({ startOnLoad: true })
  await nextTick()
  $mermaid().init()
})
</script>

<template>
  <div v-if="show" class="mermaid">
    <slot></slot>
  </div>
</template>
