export const char_exp_proper_data = [
	{
		general_name: 'resonane_potion',
		name: 'basic_resonance_potion',
		tier: 1,
		from: undefined,
		to: 'medium_resonance_potion',
		count: 3000 / 1000,
		exp_value: 1000,
	},
	{
		general_name: 'resonane_potion',
		name: 'medium_resonance_potion',
		tier: 2,
		from: 'basic_resonance_potion',
		to: 'advanced_resonance_potion',
		count: 8000 / 3000,
		exp_value: 3000,
	},
	{
		general_name: 'resonane_potion',
		name: 'advanced_resonance_potion',
		tier: 3,
		from: 'medium_resonance_potion',
		to: 'premium_resonance_potion',
		count: 20000 / 8000,
		exp_value: 8000,
	},
	{
		general_name: 'resonane_potion',
		name: 'premium_resonance_potion',
		tier: 4,
		from: 'advanced_resonance_potion',
		to: undefined,
		count: undefined,
		exp_value: 20000,
	},
];

import * as utilites from '~/data/game/inventoryItem/utilities';

export const tiered_char_exp_index_category =
	utilites.tiered_material_index_category(char_exp_proper_data);

export const tiered_char_exp_index_name =
	utilites.tiered_material_index_name(char_exp_proper_data);
