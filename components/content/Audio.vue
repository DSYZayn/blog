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

</style>