<template>
    <div class="resume-item">
        <div class="intro">
            <div class="avatar">
                <img :src="require(`@/assets/images/img_avatar.jpg`)">
                <div class="index">#{{ data }}</div>
            </div>
            <Section title="intro">
                <p v-for="key in i18n.intro" :key="key">{{ $t(key) }}</p>
            </Section>
        </div>
        <div v-for="key in list" :key="key" :class="key">
            <Section :title="key">
                <InfoCard v-for="(e, i) in i18n[key]" :key="i" :title="$t(e.name)" :list="e.content.map(c => $t(c))" />
            </Section>
        </div>
        <hr />
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { getStore } from "@/models/store";
import { i18n } from "@/models/langs";

export default {
    // mixins: [],
    components: {
        Section: defineAsyncComponent(() => import(/* webpackChunkName: "comps/Section-vue" */ "@/views/comps/Section.vue")),
        InfoCard: defineAsyncComponent(() => import(/* webpackChunkName: "comps/InfoCard-vue" */ "@/views/comps/InfoCard.vue")),
    },
    props: {
        data: { type: String, required: true },
    },
    setup() {
        const { site } = getStore();
        const list = ["experiences", "education", "skills"];

        return { site, i18n, list };
    },
}
</script>

<style lang="scss">
.resume-item {
    .intro {
        display: flex;
        flex-direction: row;

        @include xs-only {
            flex-direction: column !important;
            align-items: center;
        }

        .avatar {
            position: relative;
            margin-right: 20px;
            margin-left: 20px;
            width: 200px;

            img {
                width: 200px;
                border-radius: 10px;
            }
            .index {
                position: absolute;
                top: 5px;
                right: 10px;

                color: nth($c-theme, 5);
                font-size: 36px;
                font-weight: bold;
                -webkit-text-stroke: 0.5px nth($c-theme, 1); 
            }
        }
    }
    .experiences, .education, .skills {
        .section > .content {
            display: grid;
            flex-direction: row;
            grid-template-columns: 1fr 1fr;

            @include xs-only {
                grid-template-columns: 1fr;
            }
        }
    }
}
</style>
