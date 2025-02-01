<template>
  <div class="relative" @mouseenter="hovererd = true" @mouseleave="hovererd = false">
    <pre :class="$props.class"><slot /></pre>
    <Transition name="fade">
      <span v-if="filename && !hovererd" class="text-sm absolute top-1 right-1 text-white">
        {{ filename }}
      </span>
    </Transition>
    <Transition name="fade">
      <ProseCopyButton v-if="hovererd" :content="code" class="w-3 h-1 absolute bottom-6 right-6" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
const hovererd = ref(false)
</script>

<style>
pre code .line {
  display: block;
}
</style>
