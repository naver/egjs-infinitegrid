import buildHelper from "@egjs/build-helper";
import svelte from 'rollup-plugin-svelte';
import { preprocess } from "@pyoner/svelte-ts-preprocess";

const defaultOptions = {
	tsconfig: "",
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
		input: './src/index.umd.js',
        output: "dist/infinitegrid.cjs.js",
        format: "cjs",
    },
    {
		...defaultOptions,
		input: './src/index.js',
        output: "dist/infinitegrid.esm.js",
		format: "es",
		exports: "named",
    },
]);
