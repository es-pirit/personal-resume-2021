import { useI18n } from "vue-i18n";

export class VueUtils {
    /** Get the content of the specific i18n array */
    static getI18nList(path: string) {
        const { t } = useI18n();
        const list = [] as string[];

        // Temporally disable the warning of undefined index
        const warn = console.warn;
        console.warn = function () {}; // eslint-disable-line

        while (true) {
            const key = `${ path }[${ list.length }]`;
            const text = t(key);

            if (key === text) {
                console.warn = warn;
                return list;
            }
            else list.push(text);
        }
    }
}

export class FuncUtils {
    /** Delay execute the specific function */
    static debounce(callback: (updates: any) => void, delay = 500) {
        let timeout: number;

        return function(this: any, ...args: any[]) {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => callback.apply(this, (args as any)), delay);
        };
    }

    /**
     * Use `awiat` to wait for the specific milliseconds [使用 `awiat` 等待特定毫秒數]
     * 
     * @param timeout The specific milliseconds (default: `200`)
     * 
     * @example
     * await sleep(1000);    // wait for 1 second
     * await sleep(2000, resolve => done && resolve());    // wait for 2 seconds, or end it early if done
     */
    static sleep(timeout = 200, callback?: (resolve: () => void, timeoutId: number) => void) {
        let timeoutId: number;
        return new Promise<void>(resolve => {
            timeoutId = window.setTimeout(resolve, timeout);
            callback?.(resolve, timeoutId);
        }).then(() => window.clearTimeout(timeoutId));
    }

    /**
     * Loop to check if the result is `true` or non-null [循環檢查結果是否為 `true` 或非空值]
     * @param attempt The number of attempt to check the result (default: `0`, Infinite loop)
     * 
     * @example
     * await check(() => fromServer.data, 1000);    // including the first time, loop to check if the `fromServer.data` has any value
     */
    static async check<T>(predicate: () => false | T, interval?: number): Promise<T>;
    static async check<T>(predicate: () => false | T, interval?: number, attempt?: number): Promise<T | undefined>;
    static async check<T>(predicate: () => false | T, interval = 200, attempt = 0) {
        attempt = (attempt <= 0) ? -1 : attempt;

        while (attempt !== 0) {
            const result = predicate();
            if (typeof result === "number" || result) return result;
            if (attempt > 0) attempt--;

            await FuncUtils.sleep(interval);
        }
    }

    static setProps<T>(target: Dict, match: string | RegExp, handle: (key: string, value: T) => void) {
        Object.keys(target).forEach(prop => (prop.match(match)?.length === 1) && handle(prop, target[prop]));
    }
}
