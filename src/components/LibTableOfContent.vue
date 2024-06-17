<template>
    <ul>
        <li v-for="item in sidebars">
            <template v-if="item.items">
                <div class="text-lg font-semibold" v-html="item.text" />
                <ul>
                    <li v-for="subItem in item.items">
                        <a :href="subItem.link" v-html="subItem.text" />
                    </li>
                </ul>
            </template>
            <template v-else>
                <a :href="item.link" v-html="item.text" />
            </template>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { vitePressSidebars } from "../doc-json";

const props = withDefaults(
    defineProps<{
        type: "stdlib" | "pkg";
    }>(),
    {
        type: "stdlib",
    },
);

const sidebars: any[] =
    props.type == "stdlib" ? vitePressSidebars.stdlib : vitePressSidebars.pkg;
</script>
