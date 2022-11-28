// @ts-nocheck
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/styles`;

/** @type {import('@sveltejs/kit').Config} */
const config = {

	preprocess: [
		preprocess({
			postcss: true,
			scss: {
				prependData: `@import '${sassPath}/_global-imports.scss';`
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
