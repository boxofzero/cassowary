export const weap_proper_data = [
	{
		general_name: 'energy_core',
		name: 'basic_energy_core',
		tier: 1,
		from: undefined,
		to: 'medium_energy_core',
		count: 3000.0 / 1000,
		exp_value: 1000,
	},
	{
		general_name: 'energy_core',
		name: 'medium_energy_core',
		tier: 2,
		from: 'basic_energy_core',
		to: 'advanced_energy_core',
		count: 8000.0 / 3000,
		exp_value: 3000,
	},
	{
		general_name: 'energy_core',
		name: 'advanced_energy_core',
		tier: 3,
		from: 'medium_energy_core',
		to: 'premium_energy_core',
		count: 20000.0 / 8000,
		exp_value: 8000,
	},
	{
		general_name: 'energy_core',
		name: 'premium_energy_core',
		tier: 4,
		from: 'advanced_energy_core',
		to: undefined,
		count: undefined,
		exp_value: 20000,
	},
];

import * as utilites from '~/data/game/inventoryItem/utilities';

export const tiered_weap_exp_index_category =
	utilites.tiered_material_index_category(weap_proper_data);

export const tiered_weap_exp_index_name =
	utilites.tiered_material_index_name(weap_proper_data);
