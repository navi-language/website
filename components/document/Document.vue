<template>
  <div class="navi-document">
    <h1>{{ name }}</h1>
    <div class="module-doc">{{ module.doc }}</div>

    <div class="functions">
      <h2>Functions</h2>

      <template v-for="(symbol, name) in module.symbols" :key="name">
        <template v-if="symbol.kind === 'function'">
          <Function :name="name" :symbol="symbol" />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Function from './Function.vue';
import type { Module } from './types';

const props = defineProps<{
  name: String;
  module: Module;
  modules: Record<string, Module>;
}>();
</script>
