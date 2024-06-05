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
