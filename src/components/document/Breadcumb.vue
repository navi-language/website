<template>
  <div class="breadcumb">
    <a :href="channelItem.href">{{ channelItem.name }}</a>
    <span class="divider">/</span>
    <template v-for="(item, index) in breadcumbs">
      <a v-if="item.href" :href="item.href">{{ item.name }}</a>
      <span v-else>{{ item.name }}</span>
      <span class="divider" v-if="index < breadcumbs.length - 1">/</span>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  channel: 'stdlib' | 'pkg';
  breadcumbs: {
    name: string;
    href?: string;
  }[];
}>();

const channelItem =
  props.channel == 'pkg'
    ? {
        name: 'Pkg',
        href: '/pkg/',
      }
    : {
        name: 'Stdlib',
        href: '/stdlib/',
      };
</script>

<style type="scss" scoped>
.breadcumb {
  @apply flex items-center gap-1.5 text-sm mb-6;
  @apply text-gray-600;
  @apply dark:text-gray-400;

  a {
    @apply text-gray-700;
    @apply dark:text-gray-300;
  }

  .divider {
    @apply scale-90 text-gray-400;
    @apply dark:text-gray-600;
  }
}
</style>
