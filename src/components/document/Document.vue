<template>
  <div class="navi-document">
    <h1>{{ name }}</h1>
    <Doc :doc="module.doc" />

    <div class="navi-types">
      <div id="types" class="doc-section-title">Types</div>

      <template v-for="(symbol, name) in module.symbols" :key="name">
        <template v-if="symbol.kind === 'type'">
          <Type :name="name" :symbol="symbol" />
        </template>
      </template>
    </div>

    <div class="module-doc">{{ module.doc }}</div>

    <div class="navi-fns">
      <div class="doc-section-title" id="fn">Functions</div>

      <template v-for="(symbol, name) in module.symbols" :key="name">
        <template v-if="symbol.kind === 'function'">
          <Function :name="name" :symbol="symbol" heading="2" />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Doc from './Doc.vue';
import Function from './Function.vue';
import Type from './Type.vue';
import type { Module } from './types';

const props = defineProps<{
  name: String;
  module: Module;
  modules: Record<string, Module>;
}>();
</script>

<style type="scss">
.navi-document {
  h2 {
    @apply border-t-0 border-b pb-1 text-xl border-gray-600 text-gray-800 mb-6;
    @apply dark:text-gray-200 dark:border-gray-400;
  }

  .doc-section-title {
    @apply text-base font-semibold my-8 mb-2 border-l-4 border-blue-500 text-blue-600 pl-3;
    @apply dark:border-blue-400 dark:text-blue-400;
  }

  .heading-anchor {
    @apply absolute px-1 -left-4 hidden text-blue-600;
    @apply dark:border-blue-400;
  }
}

html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
