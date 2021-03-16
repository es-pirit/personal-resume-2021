<template>
    <div id="portfolio">
        <div v-for="data in site.gitList" :key="data.name" :ref="setRef" :id="data.name" :class="['item', lastObservered === data.name && 'observered']">
            <div class="title"># {{ $t(i18n.portfolio[data.name].name) }}</div>
            <div class="git-info">
                <div class="git-title">{{ data.name }}</div>
                <div class="git-description">{{ data.description }}</div>
                <a class="git-link" :href="data.html_url" target="blank">{{ data.html_url }}</a>
            </div>
            <div class="item-info">
                <div v-if="site.portfolio[data.name].demo">
                    <span>{{ $t("titles.demo") }}</span><br />
                    <a :href="site.portfolio[data.name].demo" target="blank">{{ site.portfolio[data.name].demo }}</a><br />
                    <span> ({{ $t(i18n.portfolio[data.name].note) }})</span>
                </div>
                <Section v-for="key in list" :key="key" :title="key" small>
                    <ul class="list">
                        <li v-for="e in i18n.portfolio[data.name][key]" :key="e">{{ $t(e) }}</li>
                    </ul>
                </Section>
            </div>
        </div>
        <div class="preview">
            <div v-if="portfolioImage" class="preview-image" :style="portfolioImage"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onBeforeUpdate, reactive } from "vue";
import { getStore } from "@/models/store";
import { i18n } from "@/models/langs";

export default {
    // mixins: [],
    components: {
        Section: defineAsyncComponent(() => import(/* webpackChunkName: "comps/Section-vue" */ "@/views/comps/Section.vue")),
    },
    setup() {
        const { site, dispatch } = getStore();
        dispatch("site/getGitList");

        const list = ["description", "points"];
        const renderedItems = [] as HTMLDivElement[];
        const observered = reactive([] as string[]);
        const previous = reactive({} as Record<string, { y: number, ratio: number }>);

        const lastObservered = computed(() => observered.peek());
        const portfolioImage = computed(() => {
            if (lastObservered.value) {
                const ratio = previous[lastObservered.value].ratio;
                const num = site.portfolio[lastObservered.value].numPreviews as number;
                if (num) {
                    return `background-image: url(${ require(`@/assets/images/portfolio/${ lastObservered.value }/img_preview${ (ratio * num >> 0).clamp(0, num - 1) }.jpg`) });`;
                }
            }
            return "";
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                const prev = (previous[e.target.id] ||= { y: 0, ratio: 0 });
                const y = e.boundingClientRect.y;
                const ratio = e.intersectionRatio;

                if (y < prev.y) {
                    // The targer enters when scrolling down 
                    if (ratio > prev.ratio && e.isIntersecting)
                        observered.includes(e.target.id) || observered.push(e.target.id);

                    // The targer leaves when scrolling down 
                    else {
                        if (ratio < 0.2) observered.remove(e.target.id);
                    }
                }
                else if (y > prev.y && e.isIntersecting) {
                    // The targer leaves when scrolling up 
                    if (ratio < prev.ratio) {
                        if (ratio < 0.2) observered.remove(e.target.id);
                    }

                    // The targer enters when scrolling up 
                    else observered.includes(e.target.id) || observered.unshift(e.target.id);
                }
                Object.assign(prev, { y, ratio });
            });
        }, { threshold: Array.build(21, i => i / 20) });

        const setRef = (e?: HTMLDivElement) => {
            if (e && !renderedItems.includes(e)) {
                renderedItems.push(e);
                observer.observe(e);
            }
        };
        const unobserve = () => {
            renderedItems.forEach(e => observer.unobserve(e));
            renderedItems.length = 0;
        };

        onBeforeUpdate(unobserve);
        onBeforeUnmount(unobserve);

        return { site, i18n, list, setRef, observered, lastObservered, portfolioImage };
    },
}
</script>

<style lang="scss">
#portfolio {
    position: relative;

    @include xs-only {
        padding-bottom: 30vh;
    }

    a {
        color: nth($c-theme, 4);
    }

    .item {
        width: 50%;
        padding: 10px;

        @include xs-only {
            width: calc(100% - 20px);
            border-radius: 10px 10px 0 0;
        }

        &.observered {
            border-radius: 10px 0 0 10px;
            background: rgba(nth($c-theme, 4), 0.15);
        }

        .title {
            color: nth($c-theme, 5);
            font-size: 24px;
            font-weight: bold;
        }
        .git-info {
            margin: 5px 0 10px 15px;
            padding: 5px;

            color: nth($c-theme, 6);

            border-radius: 3px;
            background: rgba(nth($c-theme, 4), 0.15);

            div {
                padding-bottom: 5px;
            }
        }
        .item-info {
            margin-left: 20px;

            .list {
                text-indent: 0;
                line-height: 22px;

                margin-block-start: 0;
                margin-block-end: 0;
                padding-inline-start: 10px;

                @include locale-en {
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
    }

    .preview {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;

        background: rgba(nth($c-theme, 4), 0.15);

        @include xs-only {
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 30vh;
        }
        @include sm-and-up {
            z-index: -1;
            right: 0;
            top: 0;
            width: calc(50% - 20px);
            height: 100vh;
        }

        .preview-image {
            width: 90%;
            height: 80%;

            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
        }
    }
}
</style>
