<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard, onClickOutside } from '@vueuse/core'
import { useAppConfig } from '#imports'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const copyButtonRef = ref<HTMLElement>()

const { copy: copyToClipboard } = useClipboard()
onClickOutside(copyButtonRef, () => {
  if (state.value === 'copied') {
    state.value = 'init'
  }
})
const { prose } = useAppConfig()

const state = ref('init')

const copy = (_e: MouseEvent) => {
  copyToClipboard(props.content)
    .then(() => {
      state.value = 'copied'
    })
    .catch((err) => {
      console.warn("Couldn't copy to clipboard!", err)
    })
}
</script>

<template>
  <div
    class="tooltip tooltip-left tooltip-accent tooltip-xs"
    :class="{ 'tooltip-open': show }"
    data-tip="Clip to clipboard"
  >
    <button
      ref="copyButtonRef"
      :class="[(show || state === 'copied') && 'show']"
      class="btn btn-xs btn-ghost text-white"
      @click="copy"
    >
      <Transition name="fade">
        <Icon
          v-if="state === 'copied'"
          :name="prose.copyButton?.iconCopied"
          size="18"
          class="copied"
        />
        <Icon v-else :name="prose.copyButton?.iconCopy" size="18" />
      </Transition>
    </button>
  </div>
</template>

<style scoped></style>
