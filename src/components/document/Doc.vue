<template>
  <div class="navi-doc" v-html="html"></div>
</template>

<script setup lang="ts">
import { renderMarkdown } from './hightlight';
import { replaceHeading } from './utils';
const props = defineProps<{
  doc: string;
  default?: string;
  level?: number;
}>();

const defaultDoc = props.default === undefined ? '' : props.default;

const md = replaceHeading(props.doc || defaultDoc, props.level || 2);
const html = renderMarkdown(md);
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
