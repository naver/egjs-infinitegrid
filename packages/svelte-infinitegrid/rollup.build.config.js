import buildHelper from "@egjs/build-helper";
import svelte from 'rollup-plugin-svelte';
import { preprocess } from "@pyoner/svelte-ts-preprocess";

const defaultOptions = {
    tsconfig: "",
    input: './src/index.ts',
    commonjs: true,
    external: {
        "svelte": "svelte",
    },
    plugins: [
        svelte({
            preprocess: preprocess(),
        }),
    ],
}
export default buildHelper([
    {
        ...defaultOptions,
        output: "dist/infinitegrid.cjs.js",
        format: "cjs",
    },
    {
        ...defaultOptions,
        output: "dist/infinitegrid.esm.js",
        format: "es",
    },
]);
