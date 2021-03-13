import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { getStore } from "@/models/store";

function createNav() {
    return getStore().site.nav.map((v, i) => {
        const name = v.toCamelCase(true);
        const route = {
            path: `/${ v }`,
            name,
            component: () => import(/* webpackChunkName: "pages/[request]" */ `@/views/pages/${ name }.vue`),
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
});
// router.beforeEach(async (to, from, next) => {
//     next();
// });

export default router;
