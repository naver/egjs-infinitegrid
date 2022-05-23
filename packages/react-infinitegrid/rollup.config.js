const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
    sourcemap: true,
    name: "ReactInfiniteGrid",
};

export default buildHelper([
    {
        ...defaultOptions,
        input: "./src/index.ts",
        exports: "named",
        format: "es",
        output: "./dist/infinitegrid.esm.js",
        commonjs: true,
    },
    {
        ...defaultOptions,
        input: "./src/index.umd.ts",
        exports: "default",
        format: "cjs",
        output: "./dist/infinitegrid.cjs.js",
        commonjs: true,
    },
    {
        ...defaultOptions,
        input: "./src/index.umd.ts",
        exports: "default",
        format: "umd",
        output: "./dist/infinitegrid.umd.js",
        external: {
            "@egjs/infinitegrid": "InfiniteGrid",
            "react": "React",
        },
    },
]);
