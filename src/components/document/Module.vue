<template>
  <div class="navi-document">
    <Breadcumb :breadcumbs="[{ name: name }]" />

    <div class="navi-module">
      <h1>{{ name }}</h1>
      <Doc :doc="module.doc" default="" />

      <template v-if="hasTypes">
        <div class="navi-types">
          <div id="types" class="doc-section-title">Types</div>

          <ul>
            <template v-for="(symbol, name) in module.symbols" :key="name">
              <template v-if="symbol.kind === 'type'">
                <li>
                  <a :href="symbol.id">{{ name }}</a>
                </li>
              </template>
            </template>
          </ul>
        </div>
      </template>

      <div class="module-doc">{{ module.doc }}</div>

      <div class="navi-fns" v-if="hasFunctions">
        <div class="doc-section-title" id="fn">Functions</div>

        <template v-for="(symbol, name) in module.symbols" :key="name">
          <template v-if="symbol.kind === 'function'">
            <Function :name="name" :symbol="symbol" :level="2" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '../../types';
import Breadcumb from './Breadcumb.vue';
import Doc from './Doc.vue';
import Function from './Function.vue';

import './style.scss';

const props = defineProps<{
  prefix: 'stdlib' | 'pkg';
  name: string;
  module: Module;
}>();

const hasFunctions = Object.entries(props.module.symbols).some(
  ([_, symbol]) => symbol.kind === 'function'
);
const hasTypes = Object.entries(props.module.symbols).some(
  ([_, symbol]) => symbol.kind === 'type'
);
</script>

<style type="scss" scoped>
.navi-types {
  ul {
    li {
      list-style: square;
    }
  }
}
</style>
