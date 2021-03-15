<template>
    <div :class="['section', small && 'small']">
        <div class="title">
            <img class="icon" :src="require(`@/assets/images/icons/img_${ title }.png`)">
            <div>{{ $t(`titles.${ title }`) }}</div>
        </div>
        <div class="content">
            <slot />
        </div>
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
        small: { type: Boolean, default: false },
    },
    setup() {
        const { site } = getStore();
        return { site };
    },
}
</script>

<style lang="scss">
.section {
    > .title {
        margin-top: 15px;
        padding: 0 5px;
        border-bottom: 3px dotted nth($c-theme, 5);

        .icon {
            margin-right: 10px;
            height: 32px;
        }
        div {
            display: inline-block;
            vertical-align: middle;

            color: nth($c-theme, 5);
            font-size: 24px;
            font-weight: bold;

            &:first-letter {
                font-size: 120%;

                @include locale-en {
                    text-decoration: underline;
                }
            }
        }
    }
    > .content {
        text-indent: 28px;
        text-align: justify;
        padding: 10px 10px 10px 20px;

        p {
            margin: 0 0 6px;
            padding: 0 5px;
            font-size: 16px;

            @include locale-en {
                font-size: 14px;
                line-height: 22px;
            }

            &:hover {
                border-radius: 5px;
                background: rgba(nth($c-theme, 4), 0.15);
            }
        }
    }

    &.small {
        > .title {
            .icon {
                margin-right: 10px;
                height: 28px;
            }
            div {
                font-size: 20px;

                &:first-letter {
                    font-size: 110%;
                }
            }
        }
    }
}
</style>
