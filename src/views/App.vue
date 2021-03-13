<template>
    <div id="nav">
        <router-link v-for="title in site.nav" :key="title" :to="`/${ title }`">{{ $t(`nav.${ title }`) }}</router-link>
    </div>
    <div id="page">
        <router-view />
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
$nav-height: 46px;

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 0;

    color: #2c3e50;
    font-family: "Roboto", "Noto Sans", "微軟正黑體", "Droidsansfallback", "PingFangSC", sans-serif;
    text-align: center;

    background-color: #f3edef;
}

#app {
    padding-top: $nav-height;

    input:focus {
        outline: none !important;
    }
}

#nav {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 100%;
    height: $nav-height;

    background: #2c3e50;

    font-size: 16px;
    font-weight: normal;
    line-height: 24px;

    a {
        padding: 2.5px 10px;

        color: #a1a3a5;
        text-decoration: none;
        font-weight: bold;

        &.router-link-exact-active {
            color: #f2f6fa;

            background: #3e6183;
            border-radius: 2.5px;
        }
    }
}

#page {
    display: flex;
    justify-content: center;

    #page-content {
        text-align: left;
    }
}
</style>
