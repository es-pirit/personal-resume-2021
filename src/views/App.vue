<template>
    <div id="app-content" :class="`locale-${ locale }`">
        <div id="nav">
            <span class="author">{{ $t("author") }}</span>
            <router-link v-for="title in site.nav" :key="title" :to="`/${ title }`">{{ $t(`nav.${ title }`) }}</router-link>
            <div id="i18n">
                <label v-for="({ name }, code) in locales" :key="code" :for="id = `locale-${ code }`" class="mdl-radio mdl-js-radio mdl-js-ripple-effect" @click="onChangeLocale(code)">
                    <input type="radio" :id="id" class="mdl-radio__button" name="locales" :value="code" :checked="locale === code">
                    <span class="mdl-radio__label">{{ name.substr(0, 2) }}</span>
                </label>
            </div>
        </div>
        <div v-if="route.name" id="cover" :style="`background-image: url(${ require(`@/assets/images/covers/img_${ route.name }.jpg`) })`">
            <div class="mask">{{ $t(`nav.${ route.name }`) }}</div>
            <div class="implements">
                <div v-for="key in i18n.implements[route.name]" :key="key"># {{ $t(key) }}</div>
            </div>
        </div>
        <div id="page">
            <div id="page-content">
                <router-view />
            </div>
        </div>
        <button id="to-top" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" @click="toTop">
            <span class="mdi mdi-arrow-up-bold"></span>
        </button>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { getStore } from "@/models/store";
import { i18n } from "@/models/langs";
import locales from "@/models/langs/outline.json";
import router from "@/models/router";

export default {
    // mixins: [],
    // components: {},
    setup() {
        const { site } = getStore();
        const { locale } = useI18n();
        const { currentRoute: route } = router;

        const onChangeLocale = (code: string) => {
            locale.value = code;
        };
        const toTop = () => {
            window.scrollTo(0, 0);
            site.eventBus.emit("toTop");
        };

        return { site, locale, route, locales, onChangeLocale, i18n, toTop };
    },
}
</script>

<style lang="scss">
$c-nav-text: #eff7e4, #cfe0b6;    // The color for normal, selected
$nav-height: 45px;

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 0;

    color: nth($c-theme, 6);
    font-family: "Roboto", "Noto Sans", "微軟正黑體", "Droidsansfallback", "PingFangSC", sans-serif;
    text-align: center;
    line-height: normal;

    background-color: #ebece8;

    // Hide the scrollbar
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        width: 0 !important
    }
}

#app {
    padding-top: $nav-height;

    input:focus {
        outline: none !important;
    }
}

#nav {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 100%;
    height: $nav-height;

    background: nth($c-theme, 5);

    font-size: 16px;
    font-weight: normal;
    line-height: 24px;

    a {
        padding: 2.5px 10px;

        color: nth($c-nav-text, 2);
        text-decoration: none;
        font-weight: bold;

        &.router-link-exact-active {
            color: nth($c-nav-text, 1);

            background: nth($c-theme, 4);
            border-radius: 2.5px;
        }

        @include xs-only {
            @include locale-en {
                letter-spacing: -1px;
            }
        }
    }

    .author {
        margin-right: 10px;
        padding: 0 10px;

        color: nth($c-theme, 5);
        font-weight: bold;

        background: nth($c-nav-text, 2);

        @include xs-only {
            @include locale-en {
                letter-spacing: -1px;
            }
        }
    }
    #i18n {
        position: absolute;
        right: 10px;

        color: nth($c-nav-text, 2);

        .mdl-radio__label {
            margin-right: 10px;
            font-size: 14px;
        }
    }
}

#cover {
    position: relative;
    height: 60vh;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center -25vh;
    background-attachment: fixed;

    @include xs-only {
        background-position: 60% -25vh;

        @include locale-en {
            letter-spacing: -1px;
        }
    }

    .mask {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        color: nth($c-nav-text, 1);
        font-size: 10vw;
        font-weight: bold;
        text-decoration: overline;

        background: rgba(#324215, 0.6);

        @include xs-only {
            font-size: 17.5vw;
        }
    }
    .implements {
        position: absolute;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        right: 10px;
        bottom: 20px;

        div {
            margin: 0 0 10px 10px;
            padding: 5px 10px;

            color: nth($c-nav-text, 1);
            font-size: 16px;

            border-radius: 5px;
            background: rgba(nth($c-theme, 4), 0.75);
        }
    }
}

#page {
    display: flex;
    justify-content: center;

    #page-content {
        padding: 20px 30px;
        max-width: 900px;
        text-align: left;

        @include xs-only {
            padding: 20px 20px;
        }
    }
}

#to-top {
    position: fixed;
    right: -10px;
    bottom: 10px;

    opacity: 0.85;
    color: rgba(black, 0.7);
    font-size: 40px;
}
</style>
