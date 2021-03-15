import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { getStore } from "@/models/store";

function createNav() {
    return getStore().site.nav.map((name, i) => {
        const route = {
            path: `/${ name }`,
            name,
            component: () => import(/* webpackChunkName: "pages/[request]" */ `@/views/pages/${ name.toCamelCase(true) }.vue`),
        } as RouteRecordRaw;

        if (i === 0) route.alias = "/";
        return route;
    });
}

const routes = [
    ...createNav(),
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return false;
    },
});
// router.beforeEach(async (to, from, next) => {
//     next();
// });

export default router;
