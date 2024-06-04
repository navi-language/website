<template>
  <details class="navi-source" v-if="hasSource">
    <summary>[src]</summary>
    <pre v-html="sourceHTML" />
  </details>
</template>

<script setup lang="ts">
import { highlight } from './hightlight';

const props = defineProps<{
  source: string;
}>();

const rawSource = props.source || '';
const hasSource = rawSource.length > 0;
const sourceHTML = highlight(rawSource, 'navi');
</script>

<style type="scss" scoped>
.navi-source {
  @apply relative;

  summary {
    @apply absolute right-0 -top-10 px-1 select-none;
    @apply cursor-pointer text-sm font-medium;
    @apply text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400;

    &::before {
      display: none;
      top: 2px;
    }
  }
  pre {
    @apply mt-2 text-sm p-4 rounded-sm overflow-hidden overflow-x-scroll;
    @apply bg-gray-50 border border-gray-200;
    @apply dark:bg-gray-950 dark:border-gray-800;
  }
}
</style>
