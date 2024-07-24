<script setup lang="ts"></script>

<template>
  <main class="min-h-screen w-full relative flex items-center justify-center">
    <div class="doc">
        <slot name="doc"></slot>
    </div>
    <Teleport to="#page">
<div class="toc absolute top-24  -right-52 -translate-x-full">
        <slot name="toc"></slot>
    </div>
    </Teleport>
    
  </main>
</template>

<style scoped></style>
