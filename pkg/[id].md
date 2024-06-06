---
aside: false
editLink: false
---

<script setup>
import Module from '../src/components/document/Module.vue';
import Symbol from '../src/components/document/Symbol.vue';
</script>

<template v-if="$params.type == 'module'">
  <Module prefix="pkg" :name="$params.name" :module="$params.module" />
</template>
<template v-if="$params.type == 'type'">
  <Symbol prefix="pkg" :name="$params.name" :module="$params.module" :symbol="$params.symbol" />
</template>
