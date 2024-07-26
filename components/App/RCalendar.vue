<script setup lang="ts">
import { RangeCalendar } from '@/components/ui/range-calendar'
import type { DateRange } from 'radix-vue'

const value:Ref<DateRange> = defineModel({
  required: true
})

</script>

<template>
  <RangeCalendar v-model="value" class="rounded-md border" />
</template>