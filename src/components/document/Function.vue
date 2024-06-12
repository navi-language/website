<template>
  <details class="navi-fn" open>
    <summary>
      <div class="fn-name">
        <component :is="headingTag" class="hidden">{{ name }}</component>
        <pre class="_nv_code" v-html="codeHTML" />
      </div>
      <Source :source="symbol.source" />
      <Doc :doc="symbol.doc" summary />
    </summary>
    <Doc :doc="symbol.doc" :level="level + 1" />
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionSymbol } from '../../types';
import Doc from './Doc.vue';
import Source from './Source.vue';
import { codeGenerator } from './code-generator';

const props = withDefaults(
  defineProps<{
    name: string;
    symbol: FunctionSymbol;
    level?: number;
  }>(),
  {
    level: 3,
  }
);

const codeHTML = codeGenerator.genFn(props.name, props.symbol);
const headingTag = computed(() => `h${props.level}`);
</script>

<style type="scss" scoped>
.navi-fn {
  @apply mb-10;

  .fn-name {
    @apply relative text-sm flex items-center justify-between pr-6;

    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply mt-5 pt-0 pb-0 mb-2 text-lg text-gray-700 border-gray-700;
      @apply dark:text-gray-400 dark:border-gray-400;
    }

    pre._nv_code {
      @apply whitespace-break-spaces outline-none text-base font-semibold;
    }
  }
}
</style>
