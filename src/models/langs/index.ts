import { createI18n } from "vue-i18n";
import zht from "@/models/langs/zht.json";
import en from "@/models/langs/en.json";

/** Default language */
const locale = "zht";
const messages = {
    zht, en,
};

export default createI18n({
    locale,
    fallbackLocale: locale,
    messages,
});
