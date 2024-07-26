<script setup lang="ts">
type TimeLineConfig = {
  date: string;
  tag: string;
  tagRight: boolean;
  position: "start" | "middle" | "end";
  done: boolean;
};
defineProps<{
  config: TimeLineConfig;
}>();
</script>

<template>
  <li class="m-0 h-20">
    <hr
      v-if="config.position !== 'start'"
      :class="{ 'bg-primary': config.done }"
    />

    <div
      class="timeline-start"
      :class="{
        'timeline-box': !config.tagRight,
      }"
    >
      {{ config.tagRight ? config.date : config.tag }}
    </div>
    <div class="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
        :class="{ 'text-primary': config.done}"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      class="timeline-end"
      :class="{
        'timeline-box': config.tagRight,
      }"
    >
      {{ config.tagRight ? config.tag : config.date }}
    </div>
    <hr
      v-if="config.position !== 'end'"
      :class="{ 'bg-primary': config.done}"
    />
  </li>
</template>

<style scoped></style>
