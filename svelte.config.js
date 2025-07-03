import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	build: {
		rollupOptions: {
			treeshake: true
		}
	},
	kit: {
		adapter: adapter({
			pages: "docs"
		})
	}
};

export default config;
