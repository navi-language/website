<template>
  <span class="token-value-type" v-html="nameHTML"></span>
</template>

<script setup lang="ts">
import type { Type } from '../../../types';
import { codeGenerator } from '../code-generator';

const props = defineProps<{
  type: Type;
}>();

const nameHTML = codeGenerator.genType(props.type);
</script>

<style type="scss" scoped>
.token-value-type {
  @apply text-violet-800;
  @apply dark:text-violet-400;
}
</style>
