/*
  This is for configured data, such as tiered materials
*/

export const resonator_exp_material = {
	// resonance_potion
	basic_resonance_potion: {
		exp_value: 1000,
	},
	medium_resonance_potion: {
		exp_value: 3000,
	},
	advanced_resonance_potion: {
		exp_value: 8000,
	},
	premium_resonance_potion: {
		exp_value: 20000,
	},
};

export const weapon_exp_material = {
	// energy_core
	basic_energy_core: {
		exp_value: 1000,
	},
	medium_energy_core: {
		exp_value: 3000,
	},
	advanced_energy_core: {
		exp_value: 8000,
	},
	premium_energy_core: {
		exp_value: 20000,
	},
};

import {
	tiered_enemy_drop_weapon_skill_material_index_category,
	tiered_enemy_drop_weapon_skill_material_index_name,
} from '@/data/game/inventoryItem/tiered/enemyDropWeaponSkillMaterial';

import {
	tiered_forgery_weapon_skill_material_index_category,
	tiered_forgery_weapon_skill_material_index_name,
} from '@/data/game/inventoryItem/tiered/forgeryWeaponSkillMaterial';

import {
	tiered_char_exp_index_category,
	tiered_char_exp_index_name,
} from '@/data/game/inventoryItem/tiered/characterExp';

import {
	tiered_weap_exp_index_category,
	tiered_weap_exp_index_name,
} from '@/data/game/inventoryItem/tiered/weaponExp';

export const tiered_materials_all = {
	...tiered_enemy_drop_weapon_skill_material_index_name,
	...tiered_forgery_weapon_skill_material_index_name,
	...tiered_char_exp_index_name,
	...tiered_weap_exp_index_name,
};

export const tiered_materials_per_type = {
	tiered_enemy_drop_weapon_skill_material:
		tiered_enemy_drop_weapon_skill_material_index_category,
	tiered_forgery_weapon_skill_material:
		tiered_forgery_weapon_skill_material_index_category,
	tiered_char_exp: tiered_char_exp_index_category,
	tiered_weap_exp: tiered_weap_exp_index_category,
};

export const exp_data = {
	weap_exp: weapon_exp_material,
	char_exp: resonator_exp_material,
};
