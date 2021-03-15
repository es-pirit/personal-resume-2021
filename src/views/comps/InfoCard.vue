<template>
    <div class="info-card">
        <div class="title">{{ title }}</div>
        <slot />
        <ul class="content">
            <li v-for="(e, i) in list" :key="i">{{ e }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { getStore } from "@/models/store";

export default {
    // mixins: [],
    // components: {},
    props: {
        title: { type: String, required: true },
        list: { type: Array as () => Array<string>, default: () => [] as string[] },
    },
    setup() {
        const { site } = getStore();
        return { site };
    },
}
</script>

<style lang="scss">
.info-card {
    margin: 10px;
    padding: 5px 15px;

    border-radius: 3px;
    background: rgba(nth($c-theme, 4), 0.05);
    box-shadow: 1px 1px 3px rgba(nth($c-theme, 4), 0.5);

    text-indent: 0;
    text-align: left;

    &:hover {
        background: rgba(nth($c-theme, 4), 0.15);
    }

    > .title {
        padding-bottom: 5px;

        color: nth($c-theme, 4);
        font-size: 18px;
        font-weight: bold;

        border-bottom: 1px solid rgba(nth($c-theme, 4), 0.5);
    }
    > .content {
        margin-block-start: 5px;
        margin-block-end: 5px;
        padding-inline-start: 30px;
        list-style: none;

        li {
            font-size: 16px;
            text-indent: -15px;

            &::before {
                content: "■";
                margin-right: 7.5px;

                color: nth($c-theme, 4);
                font-size: 10px;
                vertical-align: 3px;
            }

            @include locale-en {
                font-size: 14px;
                line-height: 22px;
            }
        }
    }
}
</style>
