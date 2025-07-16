import * as gameInventoryItem from '@/data/game/inventoryItem/gameInventoryItem';
export const boss_ascension_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.boss_ascension_material).forEach(function (
		[key, value],
		index
	) {
		data[key] = { count: 0 };
	});
})();

export const weekly_boss_skill_upgrade_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.weekly_boss_skill_upgrade_material).forEach(
		function ([key, value], index) {
			data[key] = { count: 0 };
		}
	);
})();

export const resonator_exp_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.resonator_exp_material).forEach(function (
		[key, value],
		index
	) {
		data[key] = { count: 0 };
	});
})();

export const weapon_exp_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.weapon_exp_material).forEach(function (
		[key, value],
		index
	) {
		data[key] = { count: 0 };
	});
})();

export const enemy_drop_weapon_skill_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.enemy_drop_weapon_skill_material).forEach(
		function ([key, value], index) {
			data[key] = { count: 0 };
		}
	);
})();

export const echo_development_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.echo_development_material).forEach(function (
		[key, value],
		index
	) {
		data[key] = { count: 0 };
	});
})();

export const forgery_weapon_skill_material = (() => {
	let data = {};
	Object.entries(gameInventoryItem.forgery_weapon_skill_material).forEach(
		function ([key, value], index) {
			data[key] = { count: 0 };
		}
	);
})();

export const overworld_resource_ascension_material = (() => {
	let data = {};
	Object.entries(
		gameInventoryItem.overworld_resource_ascension_material
	).forEach(function ([key, value], index) {
		data[key] = { count: 0 };
	});
})();

export const credit = (() => {
	let data = {};
	Object.entries(gameInventoryItem.credit).forEach(function (
		[key, value],
		index
	) {
		data[key] = { count: 0 };
	});
})();

// inventory contains inventoryItems (materials)
// exp, credit: material type -> count
// materials type -> material -> count, meta
// tiered materials type -> material -> tierMaterial -> count, meta

export const categorizedInventoryItems = {
	credit: credit,
	boss_ascension_material: boss_ascension_material,
	weekly_boss_skill_upgrade_material: weekly_boss_skill_upgrade_material,
	resonator_exp_material: resonator_exp_material,
	weapon_exp_material: weapon_exp_material,
	enemy_drop_weapon_skill_material: enemy_drop_weapon_skill_material,
	echo_development_material: echo_development_material,
	forgery_weapon_skill_material: forgery_weapon_skill_material,
	overworld_resource_ascension_material: overworld_resource_ascension_material,
};

export const dbInventoryItems = {
	...credit,
	...resonator_exp_material,
	...weapon_exp_material,
	...echo_development_material,
	...boss_ascension_material,
	...weekly_boss_skill_upgrade_material,
	...enemy_drop_weapon_skill_material,
	...forgery_weapon_skill_material,
	...overworld_resource_ascension_material,
};
