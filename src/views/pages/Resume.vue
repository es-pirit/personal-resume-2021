<template>
    <div id="resume">
        <h1>This is a page for Resume</h1>
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
#resume {

}
</style>
