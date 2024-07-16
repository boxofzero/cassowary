import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	devServer: {
		port: 8104,
	},
	modules: [
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@formkit/nuxt',
		'nuxt-lodash',
		(_options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
	],
	formkit: {
		// Experimental support for auto loading (see note):
		autoImport: true,
	},
	compatibilityDate: '2024-07-13',
	ssr: false,
	hooks: {
		'prerender:routes'({ routes }) {
			routes.clear(); // Do not generate any routes (except the defaults)
		},
	},
	build: {
		transpile: ['vuetify'],
	},
	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},
});
