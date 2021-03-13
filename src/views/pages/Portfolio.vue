<template>
    <div id="portfolio">
        <h1>This is a page for Portfolio</h1>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { getStore } from "@/models/store";

export default {
    // mixins: [],
    // components: {},
    setup() {
        const { site } = getStore();
        return { site };
    },
}
</script>

<style lang="scss">
#portfolio {

}
</style>
