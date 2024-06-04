<template>
  <div class="navi-document">
    <Breadcumb
      :breadcumbs="[
        { name: module, href: `/${prefix}/${module}` },
        { name: name },
      ]"
    />
    <div class="navi-symbol">
      <details class="symbol-summary" open>
        <summary class="symbol-name">
          <div :class="`symbol-kind symbol-kind-${symbol.value_type.type}`">
            {{ typeSign }}
          </div>
          <h1 :id="name">{{ name }}</h1>
        </summary>
        <Doc :doc="symbol.doc" />
      </details>

      <section class="symbol-fields" v-if="symbol.fields.length > 0">
        <div class="doc-section-title">Fields</div>
        <template v-for="field in symbol.fields" :key="field.name">
          <details class="field-symbol">
            <summary>
              <div class="field-name">
                <a :href="`#${name}`" class="heading-anchor fn-anchor">#</a>
                <div class="flex items-center justify-between flex1">
                  <pre
                    class="_nv_code"
                    v-html="codeGenerator.genField(field)"
                  />
                </div>
              </div>
              <Doc :doc="field.doc" summary />
            </summary>
            <Doc :doc="field.doc" />
          </details>
        </template>
      </section>

      <section class="symbol-methods" v-if="symbol.methods.length > 0">
        <div class="doc-section-title">Methods</div>
        <template v-for="method in symbol.methods" :key="method.name">
          <Function :name="method.name" :symbol="method" :level="2" />
        </template>
      </section>

      <section class="symbol-items" v-if="symbol.items.length > 0">
        <div class="doc-section-title">Enum Items</div>
        <ul>
          <template v-for="item in symbol.items" :key="item.name">
            <li :id="item.name">
              <div>
                <a :href="`#${item.name}`">{{ item.name }}</a>
              </div>
              <Doc :doc="item.doc" />
            </li>
          </template>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module, TypeSymbol } from '../../types';
import Breadcumb from './Breadcumb.vue';
import Doc from './Doc.vue';
import Function from './Function.vue';
import { codeGenerator } from './code-generator';
import { getTypeSign } from './utils';

import './style.scss';

const props = defineProps<{
  prefix: 'stdlib' | 'pkg';
  modules: Record<string, Module>;
  name: string;
  module: string;
  symbol: TypeSymbol;
}>();

const typeSign = getTypeSign(props.symbol.value_type, {
  alias: props.symbol.alias,
});
</script>

<style type="scss" scoped>
.navi-symbol {
  .symbol-summary {
    @apply mb-10;
  }

  .symbol-name {
    @apply flex items-baseline gap-2 border-b border-gray-200 border-dashed pb-2 mb-5;

    &::before {
      top: 19px;
    }

    h1 {
      @apply p-0 m-0 border-none text-gray-800;
      @apply dark:text-gray-200;
    }

    .symbol-kind {
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

  .symbol-methods {
    summary {
      @apply text-gray-600 font-bold cursor-pointer;
    }
  }
}

.field-symbol {
  summary {
    &::before {
      top: 4px;
    }
  }

  .field-name {
    @apply flex items-center;
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
