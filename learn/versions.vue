<template>
    <div class="learn-versions">
        <label>Navi Version</label>
        <div class="items">
            <template v-for="version in versions" :key="version">
                <a :href="`/learn/${version}`">{{ version }}</a>
            </template>
            <a href="/learn/">main</a>
        </div>
    </div>
</template>

<script>
const files = import.meta.glob("/learn/*.md");
const versions = Object.keys(files)
    .map((filename) => {
        return filename.match(/\/learn\/(.*)\.md/)[1];
    })
    .filter((version) => version !== "index");

export default {
    props: [],
    setup() {
        return {
            versions,
        };
    },
};
</script>

<style type="scss" scoped>
.learn-versions {
    @apply mb-10 pb-10 text-center flex flex-col items-center;

    label {
        @apply text-gray-500 dark:text-gray-400 mb-2;
    }

    .items {
        @apply flex flex-wrap justify-center gap-3;
    }

    a {
        @apply underline;
    }

    .spliter {
        @apply mx-1 text-gray-300 dark:text-gray-700 text-xs;
    }
}
</style>
