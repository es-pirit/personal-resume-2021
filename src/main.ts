import { createApp } from "vue";

(async () => {
    createApp((await import(/* webpackChunkName: "App-vue" */ "@/views/App.vue")).default)
        .use((await import(/* webpackChunkName: "store" */ "@/models/store")).default)
        .use((await import(/* webpackChunkName: "router" */ "@/models/router")).default)
        .use((await import(/* webpackChunkName: "langs" */ "@/models/langs")).default)
        .mount("#app");
})();
