---
title:
---

<script setup>
import Module from '../src/components/document/Module.vue';
import Symbol from '../src/components/document/Symbol.vue';
</script>

<template v-if="$params.type == 'module'">
  <Module :name="$params.name" :module="$params.module" :modules="$params.modules" />
</template>
<template v-if="$params.type == 'type'">
  <Symbol :name="$params.name" :module="$params.module" :symbol="$params.symbol" :modules="$params.modules" />
</template>
