import { readonly } from "vue";
import { Module } from "vuex";
import mitt from "mitt";
import Axios from "axios";

import { RootState } from "@/models/store";

type Git = { id: number, name: string, html_url: string, description: string };

const state = () => ({
    eventBus: mitt(),

    nav: readonly(["resume", "portfolio"]),

    resumeData: Array.build(30, i => `${ i + 1 }`),
    // resumeData: Array.build(30, () => Array.build(3, () => String.fromCharCode(Math.randomInt(65, 90, true))).join("")),

    gitList: [] as Git[],
    portfolio: {
        "panda-mobile": {
            numPreviews: 14,
            demo: "https://marshalls.oriental-game.com/ogplus",
        },
        "live-casino": {
            numPreviews: 3,
            demo: "http://tw.stage.api.livecasino168.com/app-api/visitorLink?Lang=zh_TW",
        },
        "summon-magicrystal": {
            numPreviews: 11,
            demo: "https://drive.google.com/file/d/1Cu5-k4x2c18iRaDLnsQVStunxrnCmWa2",
        },
        "slot-ghost": {
            numPreviews: 12,
            demo: "http://stage.sytepoker.com/slot/trail",
        },
        "official-website": {
            numPreviews: 5,
            demo: "https://s3-ap-northeast-1.amazonaws.com/www.phagaming.com/index.html",
        },
        "mpz-utilities": {
            numPreviews: 0,
            demo: "",
        },
        "mpz-i18n": {
            numPreviews: 1,
            demo: "https://docs.google.com/spreadsheets/d/1kOGhB2YNTZRjz-S6oVtMp7LkjhEfFaE7MHZNsMDAYgQ",
        },
        "personal-resume-2021": {
            numPreviews: 2,
            demo: "https://mpsn-studio.club/personal-resume/#/",
        },
        "creator-card": {
            numPreviews: 4,
            demo: "https://mpsn-studio.club/creator-card/#/",
        },
    },
});

export type State = ReturnType<typeof state>;

export default {
    namespaced: true,
    state,
    actions: {
        async getGitList({ state }) {
            if (state.gitList.length === 0) {
                const { data } = (await Axios.get<Git[]>(`https://api.github.com/users/es-pirit/repos`));
                state.gitList = data.sort((a, b) => a.id - b.id);
            }
        },
    },
} as Module<State, RootState>;
