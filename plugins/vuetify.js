// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VNumberInput } from 'vuetify/labs/VNumberInput';

export default defineNuxtPlugin((app) => {
	const vuetify = createVuetify({
		theme: {
			defaultTheme: 'dark',
		},
		components: {
			VNumberInput,
		},
	});
	app.vueApp.use(vuetify);
});
