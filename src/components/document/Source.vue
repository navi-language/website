<template>
  <details class="navi-source language-nv" v-if="hasSource">
    <summary>[src]</summary>
    <pre class="shiki" v-html="sourceHTML" />
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
  @apply relative -top-5;

  &[open] {
    summary {
      @apply text-yellow-600;
    }
  }

  summary {
    @apply text-right px-1 select-none float-right clear-right;
    @apply cursor-pointer text-sm font-medium mb-2;
    @apply text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400;

    &::before {
      display: none;
    }
  }

  pre.shiki {
    @apply clear-both;
    @apply mt-2 text-sm p-4 rounded-sm overflow-hidden overflow-x-scroll whitespace-break-spaces;
    @apply bg-gray-100 dark:bg-stone-900;
  }
}
</style>
