<template>
  <div class="navi-fn">
    <component :is="headingTag" class="hidden">{{ name }}</component>
    <div class="fn-name">
      <a :href="`#${name}`" class="heading-anchor fn-anchor">#</a>
      <NaviCode :code="codeHTML" lang="navi" />
    </div>
    <Doc :doc="symbol.doc" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionSymbol } from '../../types';
import Doc from './Doc.vue';
import NaviCode from './NaviCode.vue';
import { genFn } from './utils';

const props = withDefaults(
  defineProps<{
    name: string;
    symbol: FunctionSymbol;
    heading?: number;
  }>(),
  {
    heading: 3,
  }
);

const codeHTML = genFn(props.name, props.symbol);
const headingTag = computed(() => `h${props.heading}`);
</script>

<style type="scss">
.navi-fn {
  @apply mb-10;

  .fn-name {
    @apply relative text-sm border-b border-gray-500 border-dashed pb-2;
    @apply dark:border-gray-700;

    &:hover {
      .fn-anchor {
        @apply block;
      }
    }

    pre {
      @apply whitespace-break-spaces outline-none;
    }
  }
}
</style>
