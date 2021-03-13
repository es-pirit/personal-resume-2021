import { readonly } from "vue";
import type { Module } from "vuex";

import type { RootState } from "@/models/store";
import mitt from "mitt";

const state = () => ({
    eventBus: mitt(),

    nav: readonly(["resume", "portfolio"]),
});

export type State = ReturnType<typeof state>;

export default {
    namespaced: true,
    state,
} as Module<State, RootState>;
