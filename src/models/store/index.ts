import { createStore } from "vuex";

import site, { State as Site } from "@/models/store/Site";

export type RootState = {
    site: Site,
};

const store = createStore<RootState>({
    modules: { site },
});
export default store;

export function getStore() {
    const { state, getters, commit, dispatch } = store;
    return { ...state, state, getters: getters as Dict, commit, dispatch };
}
