<template>
  <span class="token-value-type">{{ name }}</span>
</template>

<script setup lang="ts">
import type { Type } from '../../../types';
import { genType } from '../utils';

const props = defineProps<{
  type: Type;
}>();

const name = genType(props.type);
</script>

<style type="scss" scoped>
.token-value-type {
  @apply text-violet-800;
  @apply dark:text-violet-400;
}
</style>
