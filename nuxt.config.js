// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	devServer: {
		port: 8104,
	},
	modules: ['@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt', '@formkit/nuxt'],
	formkit: {
		// Experimental support for auto loading (see note):
		autoImport: true,
	},
});
