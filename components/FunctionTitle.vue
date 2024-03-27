<template>
    <div class="fn-title">
        <slot></slot>
        <a :href="`#${anchor}`" class="header-anchor" :id="anchor"></a>
    </div>
</template>

<script>
export default {
    props: ["anchor", "level", "title"],
};
</script>
