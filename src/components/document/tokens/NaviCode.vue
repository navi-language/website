<template>
  <pre class="shiki navi-code" v-html="html" />
</template>

<script setup lang="ts">
import { highlight } from '../hightlight';

const props = defineProps<{
  code: string;
  lang: 'navi' | 'navi-stream' | string;
}>();

const html = highlight(props.code, props.lang);
</script>
