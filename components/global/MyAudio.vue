<script setup lang="ts">
import AudioPlayer from 'vue3-audio-player';
import type { AudioPlayerOption } from 'vue3-audio-player';
import 'vue3-audio-player/dist/style.css';

defineProps<{
    config:AudioPlayerOption
}>()
</script>

<template>
    <AudioPlayer :option="config" />
</template>

<style scoped>
:deep(.audio__player-play-icon){
    @apply w-10 h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer;
}
</style>