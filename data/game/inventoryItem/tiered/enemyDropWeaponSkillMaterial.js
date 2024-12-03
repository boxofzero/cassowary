export const enemy_drop_proper_data = [
	{
		general_name: 'howler_core',
		name: 'lf_howler_core',
		tier: 1,
		from: undefined,
		to: 'mf_howler_core',
		count: 3,
	},
	{
		general_name: 'howler_core',
		name: 'mf_howler_core',
		tier: 2,
		from: 'lf_howler_core',
		to: 'hf_howler_core',
		count: 3,
	},
	{
		general_name: 'howler_core',
		name: 'hf_howler_core',
		tier: 3,
		from: 'mf_howler_core',
		to: 'ff_howler_core',
		count: 3,
	},
	{
		general_name: 'howler_core',
		name: 'ff_howler_core',
		tier: 4,
		from: 'hf_howler_core',
		to: undefined,
		count: undefined,
	},
	{
		general_name: 'whisperin_core',
		name: 'lf_whisperin_core',
		tier: 1,
		from: undefined,
		to: 'mf_whisperin_core',
		count: 3,
	},
	{
		general_name: 'whisperin_core',
		name: 'mf_whisperin_core',
		tier: 2,
		from: 'lf_whisperin_core',
		to: 'hf_whisperin_core',
		count: 3,
	},
	{
		general_name: 'whisperin_core',
		name: 'hf_whisperin_core',
		tier: 3,
		from: 'mf_whisperin_core',
		to: 'ff_whisperin_core',
		count: 3,
	},
	{
		general_name: 'whisperin_core',
		name: 'ff_whisperin_core',
		tier: 4,
		from: 'hf_whisperin_core',
		to: undefined,
		count: undefined,
	},
	{
		general_name: 'mask',
		name: 'mask_of_constraint',
		tier: 1,
		from: undefined,
		to: 'mask_of_erosion',
		count: 3,
	},
	{
		general_name: 'mask',
		name: 'mask_of_erosion',
		tier: 2,
		from: 'mask_of_constraint',
		to: 'mask_of_distortion',
		count: 3,
	},
	{
		general_name: 'mask',
		name: 'mask_of_distortion',
		tier: 3,
		from: 'mask_of_erosion',
		to: 'mask_of_insanity',
		count: 3,
	},
	{
		general_name: 'mask',
		name: 'mask_of_insanity',
		tier: 4,
		from: 'mask_of_distortion',
		to: undefined,
		count: undefined,
	},
	{
		general_name: 'ring',
		name: 'crude_ring',
		tier: 1,
		from: undefined,
		to: 'basic_ring',
		count: 3,
	},
	{
		general_name: 'ring',
		name: 'basic_ring',
		tier: 2,
		from: 'crude_ring',
		to: 'improved_ring',
		count: 3,
	},
	{
		general_name: 'ring',
		name: 'improved_ring',
		tier: 3,
		from: 'basic_ring',
		to: 'tailored_ring',
		count: 3,
	},
	{
		general_name: 'ring',
		name: 'tailored_ring',
		tier: 4,
		from: 'improved_ring',
		to: undefined,
		count: undefined,
	},
];

export const tiered_enemy_drop_weapon_skill_material_index_category =
	Object.keys(enemy_drop_proper_data).reduce((acc, key) => {
		const { general_name, name, tier, from, to, count } =
			enemy_drop_proper_data[key];
		acc[general_name] = acc[general_name] || {};
		if (to) {
			acc[general_name][tier] = {
				name,
				synthesizable: {
					to: tier,
					count,
				},
			};
		} else {
			acc[general_name][tier] = {
				name,
			};
		}
		return acc;
	}, {});

export const tiered_enemy_drop_weapon_skill_material_index_name = Object.keys(
	enemy_drop_proper_data
).reduce((acc, key) => {
	const { general_name, name, from, to, count } = enemy_drop_proper_data[key];
	acc[name] = {
		to: to,
		cost: count,
	};
	if (from) acc[name].from = from;
	return acc;
}, {});
