<template>
  <div class="navi-fn">
    <div class="fn-name">
      <a :href="`#${name}`" class="heading-anchor fn-anchor">#</a>
      <component :is="headingTag">{{ name }}</component>
      <NaviCode :code="codeHTML" lang="navi" />
    </div>
    <Doc :doc="symbol.doc" :level="level + 1" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FunctionSymbol } from '../../types';
import Doc from './Doc.vue';
import NaviCode from './tokens/NaviCode.vue';
import { genFn } from './utils';

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

const codeHTML = genFn(props.name, props.symbol);
const headingTag = computed(() => `h${props.level}`);
</script>

<style type="scss" scoped>
.navi-fn {
  @apply mb-10;

  .fn-name {
    @apply relative text-sm mb-4;

    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply mt-5 pt-0 pb-0 mb-2 text-lg text-gray-700 border-gray-700;
      @apply dark:text-gray-400 dark:border-gray-400;
    }

    .fn-anchor {
      @apply top-1;
    }

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
