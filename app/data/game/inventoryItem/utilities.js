export const tiered_material_index_category = (proper_data) => {
	return Object.keys(proper_data).reduce((acc, key) => {
		const { general_name, name, tier, from, to, count } = proper_data[key];
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
};

export const tiered_material_index_name = (proper_data) => {
	return Object.keys(proper_data).reduce((acc, key) => {
		const { general_name, name, from, to, count } = proper_data[key];
		acc[name] = {
			to: to,
			cost: count,
		};
		if (from) acc[name].from = from;
		return acc;
	}, {});
};
