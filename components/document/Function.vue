<template>
  <div class="navi-function">
    <div class="function-name">
      <NaviCode :code="genFunction(name, symbol)" lang="navi" />
    </div>
    <div class="doc">{{ symbol.doc }}</div>
  </div>
</template>

<script setup lang="ts">
import NaviCode from './NaviCode.vue';
import type { FunctionSymbol } from './types';
import { genFunction } from './utils';

const props = defineProps<{
  name: String;
  symbol: FunctionSymbol;
}>();
</script>

<style scoped type="scss">
.navi-function {
  @apply mb-10;

  .funcition-name {
    @apply text-lg font-bold;
  }
}
</style>
