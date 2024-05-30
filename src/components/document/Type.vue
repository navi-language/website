<template>
  <div class="navi-type">
    <div class="type-name">
      <a :href="`#${name}`" class="heading-anchor top-1">#</a>
      <div class="flex items-center gap-2">
        <div :class="`type-kind type-kind-${symbol.value_type.type}`">
          {{ valueTypeName }}
        </div>
        <h2 :id="name">{{ name }}</h2>
      </div>
    </div>
    <Doc :doc="symbol.doc" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Doc from './Doc.vue';
import type { TypeSymbol } from './types';

const props = defineProps<{
  name: string;
  symbol: TypeSymbol;
}>();

const valueTypeName = computed(() => {
  switch (props.symbol.value_type?.type) {
    case 'new_type':
      return 'type';
    case 'struct':
      return 'struct';
    case 'enum':
      return 'enum';
    default:
      return 'Type';
  }
});
</script>

<style type="scss">
.navi-type {
  @apply mb-10;

  .type-name {
    @apply relative text-sm border-b border-gray-200 border-dashed pb-2;

    h2 {
      @apply flex items-center gap-2 p-0 m-0 border-none text-gray-800;
      @apply dark:text-gray-200;
    }

    .type-kind {
      @apply text-base text-gray-500;
      @apply dark:text-gray-400;
    }

    &:hover {
      .heading-anchor {
        @apply block;
      }
    }

    pre {
      @apply whitespace-break-spaces outline-none;
    }
  }
}
</style>
