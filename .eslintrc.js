module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": "off",

        "template-curly-spacing": ["warn", "always"],
        "brace-style": ["warn", "stroustrup"],
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "comma-dangle": ["warn", "always-multiline"],
        "max-len": ["warn", { "code": 240 }],
        "quotes": ["warn", "double", { "allowTemplateLiterals": true }],
        "no-constant-condition": ["error", { "checkLoops": false }],
        "prefer-namespace-keyword": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                mocha: true,
            }
        }
    ]
};
