// formkit.config.js
import { defaultConfig } from '@formkit/vue';
import { rootClasses } from './formkit.theme.ts';
import { genesisIcons } from '@formkit/icons';

export default defaultConfig({
	config: {
		rootClasses,
	},
	icons: {
		...genesisIcons,
	},
});
