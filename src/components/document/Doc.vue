<template>
  <div
    class="navi-doc navi-doc-summary"
    v-if="summary"
    v-html="summaryHTML"
  ></div>
  <div class="navi-doc navi-doc-body" v-if="!summary" v-html="html"></div>
</template>

<script setup lang="ts">
import { replaceHeading } from '../../utils';
import { renderMarkdown } from './hightlight';
const props = defineProps<{
  doc: string;
  default?: string;
  level?: number;
  summary?: boolean;
}>();

const defaultDoc = props.default === undefined ? '' : props.default;

const md = replaceHeading(props.doc || defaultDoc, props.level || 2);
const summaryHTML = renderMarkdown((md || '').split('\n\n')[0]);
const html = renderMarkdown(md);
</script>

<style type="scss">
details {
  &[open] {
    .navi-doc-summary {
      display: none;
    }
  }
}
.navi-doc {
  @apply pl-5;

  p {
    @apply my-2;
  }
  pre.shiki {
    @apply overflow-x-scroll text-sm p-2 rounded-sm;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7 {
    margin: 0;
    padding: 0;
    border: none !important;
  }

  h2 {
    font-size: 1em;
  }
  h3,
  h4,
  h5,
  h6 {
    font-size: 0.9em;
  }
}
</style>
