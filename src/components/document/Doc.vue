<template>
  <div class="navi-doc" v-html="html"></div>
</template>

<script setup lang="ts">
import { renderMarkdown } from './hightlight';
const props = defineProps<{
  doc: string;
  default?: string;
}>();

const defaultDoc =
  props.default === undefined ? 'No documentation available.' : props.default;

const html = renderMarkdown(props.doc || defaultDoc);
</script>

<style type="scss">
.navi-doc {
  p {
    @apply my-2;
  }
  pre.shiki {
    @apply overflow-x-scroll text-sm p-2 rounded-sm;
  }
}
</style>
