import * as gameInventoryItemRawData from '@/data/game/inventoryItem/gameInventoryItemRawData';

export const boss_ascension_material =
	gameInventoryItemRawData.inventoryItemRawData.boss_ascension_material;
export const weekly_boss_skill_upgrade_material =
	gameInventoryItemRawData.inventoryItemRawData
		.weekly_boss_skill_upgrade_material;
export const resonator_exp_material =
	gameInventoryItemRawData.inventoryItemRawData.resonator_exp_material;
export const weapon_exp_material =
	gameInventoryItemRawData.inventoryItemRawData.weapon_exp_material;
export const enemy_drop_weapon_skill_material =
	gameInventoryItemRawData.inventoryItemRawData
		.enemy_drop_weapon_skill_material;
export const echo_development_material =
	gameInventoryItemRawData.inventoryItemRawData.echo_development_material;
export const forgery_weapon_skill_material =
	gameInventoryItemRawData.inventoryItemRawData.forgery_weapon_skill_material;
export const overworld_resource_ascension_material =
	gameInventoryItemRawData.inventoryItemRawData
		.overworld_resource_ascension_material;
export const credit = gameInventoryItemRawData.inventoryItemRawData.credit;

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

export const allInventoryItems = {
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

import * as gameInventoryItemsConfig from '~/data/game/inventoryItem/gameInventoryItemConfig';
export const tiered_materials = {
	...gameInventoryItemsConfig.tiered_materials,
};

export const exp_data = {
	...gameInventoryItemsConfig.exp_data,
};