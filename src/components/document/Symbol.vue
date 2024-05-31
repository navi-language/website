<template>
  <div class="navi-document">
    <Breadcumb
      :breadcumbs="[
        { name: module, href: `/stdlib/${module}` },
        { name: name },
      ]"
    />
    <div class="navi-symbol">
      <div class="type-name">
        <div class="flex items-center gap-2">
          <div :class="`type-kind type-kind-${symbol.value_type.type}`">
            {{ valueTypeName }}
          </div>
          <h1 :id="name">{{ name }}</h1>
        </div>
      </div>
      <Doc :doc="symbol.doc" />

      <section class="type-fields" v-if="symbol.fields.length > 0">
        <div class="section-title">Fields</div>
        <template v-for="field in symbol.fields" :key="field.name">
          <div class="field-symbol">
            <div class="field-name">
              <a :href="`#${name}`" class="heading-anchor fn-anchor">#</a>
              <div class="flex items-center justify-between flex1">
                <h3>{{ field.name }}</h3>
                <TokenValueType :type="field.value_type" />
              </div>
            </div>
            <Doc :doc="field.doc" />
          </div>
        </template>
      </section>

      <section class="type-methods" v-if="symbol.methods.length > 0">
        <div class="doc-section-title">Methods</div>
        <template v-for="method in symbol.methods" :key="method.name">
          <Function :name="method.name" :symbol="method" heading="2" />
        </template>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Module, TypeSymbol } from '../../types';
import Breadcumb from './Breadcumb.vue';
import Doc from './Doc.vue';
import Function from './Function.vue';
import { TokenValueType } from './tokens';

const props = defineProps<{
  modules: Record<string, Module>;
  name: string;
  module: string;
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
      return 'type';
  }
});
</script>

<style type="scss">
.navi-type {
  @apply mb-10;

  .type-name {
    @apply relative text-sm border-b border-gray-200 border-dashed pb-2;

    h1 {
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

  .type-methods {
    summary {
      @apply text-gray-600 font-bold cursor-pointer;
    }
  }
}

.field-symbol {
  @apply mt-5;

  .field-name {
    @apply flex items-center gap-2 pb-1 border-b border-gray-200;
    @apply dark:border-gray-900;

    h3 {
      @apply p-0 m-0 border-none text-gray-800;
      @apply dark:text-gray-200;
    }

    .token-value-type {
      @apply ml-1;
      &::before {
        content: ': ';
      }
    }
  }
}
</style>
