import { useI18n } from "vue-i18n";

export function formatTime(seconds: number, styleable = false) {
    const { t } = useI18n();
    const format = {
        sec: `${ styleable ? "<span class='time sec'>" : "" }${ t("datetime.second") }${ styleable ? "</span>" : "" }`,
        min: `${ styleable ? "<span class='time min'>" : "" }${ t("datetime.minute") }${ styleable ? "</span>" : "" }`,
        hr: `${ styleable ? "<span class='time hr'>" : "" }${ t("datetime.hour") }${ styleable ? "</span>" : "" }`,
    };

    if (seconds < 60) return `${ seconds >> 0 }${ format.sec }`;
    else if (seconds < 3600) return `${ seconds / 60 >> 0 }${ format.min } ${ `${ seconds % 60 >> 0 }`.padStart(2, "0") }${ format.sec }`;
    else return `${ seconds / 3600 >> 0 }${ format.hr } ${ `${ seconds % 3600 / 60 >> 0 }`.padStart(2, "0") }${ format.min }`;
};
