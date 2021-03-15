<template>
    <div id="resume">
        <div class="space" :style="spaceHeight"></div>
        <ResumeItem v-for="i in numRendered" :key="i" :ref="setRef" :class="(i === 1) ? 'first' : (i === numRendered && 'last')" :data="data[firstIndex + i - 1]" />
    </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
import { getStore } from "@/models/store";

type VueComponent = { $el?: HTMLDivElement };

export default {
    // mixins: [],
    components: {
        ResumeItem: defineAsyncComponent(() => import(/* webpackChunkName: "comps/ResumeItem-vue" */ "@/views/comps/ResumeItem.vue")),
    },
    setup() {
        const { site } = getStore();

        const firstIndex = ref(0);
        const itemHeight = ref(0);
        let scrollY = 0;

        const numRendered = 3;
        const renderedItems = [] as VueComponent[];

        const spaceHeight = computed(() => {
            return `height: ${ itemHeight.value * firstIndex.value }px`;
        });

        const observer = new IntersectionObserver(entries => {
            if (entries.length !== 1) return;

            const e = entries[0];

            // Scroll to bottom
            if (e.isIntersecting && e.target.classList.contains("last")) {
                scrollY = window.scrollY;
                itemHeight.value = e.boundingClientRect.height;
                firstIndex.value += (numRendered - 2);
            }
            // Scroll to top
            if (e.isIntersecting && e.target.classList.contains("first")) {
                scrollY = window.scrollY;
                itemHeight.value = e.boundingClientRect.height;
                firstIndex.value = (firstIndex.value - (numRendered - 2)).clamp(0);
            }
        }, { threshold: 0.05 });

        const setRef = (e?: VueComponent) => {
            if (e && e.$el instanceof HTMLDivElement && !renderedItems.includes(e)) {
                renderedItems.push(e);
                observer.observe(e.$el);
            }
        };
        const unobserve = () => {
            renderedItems.forEach(({ $el }) => $el && observer.unobserve($el));
            renderedItems.length = 0;
        };
        const toTop = () => {
            scrollY = 0;
            firstIndex.value = 0;
        };

        onMounted(() => {
            site.eventBus.on("toTop", toTop);
        });
        onBeforeUpdate(unobserve);
        onUpdated(() => window.scrollTo(0, scrollY));
        onBeforeUnmount(() => {
            unobserve();
            site.eventBus.off("toTop", toTop);
        });

        return { site, data: site.resumeData, firstIndex, numRendered, spaceHeight, setRef };
    },
}
</script>

<style lang="scss">
#resume {
    display: flex;
    flex-direction: column;
}
</style>
