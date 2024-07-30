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
		'vuetify-nuxt-module',
		'nuxt-lodash',
		'vite-plugin-vuetify',
		'@nuxtjs/color-mode',
	],
	compatibilityDate: '2024-07-13',
	ssr: false,
	hooks: {
		'prerender:routes'({ routes }) {
			routes.clear(); // Do not generate any routes (except the defaults)
		},
	},
	// colorMode: {
	// 	preference: 'dark',
	// },
});
