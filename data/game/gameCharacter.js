let baseCharLevellingMaterialsCount = [
	{ level: '1', materials: {} },
	{ level: '20', materials: { char_exp: 33300, shell_credit: 11655 } },
	{
		level: '20A',
		materials: {
			tiered_enemy_drop_weapon_skill_material: {
				1: 4,
			},
			shell_credit: 5000,
		},
	},
	{ level: '40', materials: { char_exp: 175500, shell_credit: 61425 } },
	{
		level: '40A',
		materials: {
			boss_ascension_material: 3,
			overworld_resource_ascension_material: 4,
			tiered_enemy_drop_weapon_skill_material: {
				2: 4,
			},
			shell_credit: 10000,
		},
	},
	{ level: '50', materials: { char_exp: 188300, shell_credit: 65905 } },
	{
		level: '50A',
		materials: {
			boss_ascension_material: 6,
			overworld_resource_ascension_material: 8,
			tiered_enemy_drop_weapon_skill_material: {
				2: 8,
			},
			shell_credit: 10000,
		},
	},
	{ level: '60', materials: { char_exp: 286600, shell_credit: 100310 } },
	{
		level: '60A',
		materials: {
			boss_ascension_material: 9,
			overworld_resource_ascension_material: 12,
			tiered_enemy_drop_weapon_skill_material: {
				3: 4,
			},
			shell_credit: 20000,
		},
	},
	{ level: '70', materials: { char_exp: 413000, shell_credit: 144550 } },
	{
		level: '70A',
		materials: {
			boss_ascension_material: 12,
			overworld_resource_ascension_material: 16,
			tiered_enemy_drop_weapon_skill_material: {
				3: 8,
			},
			shell_credit: 40000,
		},
	},
	{ level: '80', materials: { char_exp: 572400, shell_credit: 200340 } },
	{
		level: '80A',
		materials: {
			boss_ascension_material: 16,
			overworld_resource_ascension_material: 20,
			tiered_enemy_drop_weapon_skill_material: {
				4: 4,
			},
			shell_credit: 80000,
		},
	},
	{ level: '90', materials: { char_exp: 768900, shell_credit: 269115 } },
];

export const activeSkillLevellingMaterialsCount = [
	{ level: 1, materials: {} },
	{
		level: 2,
		materials: {
			shell_credit: 1500,
			tiered_enemy_drop_weapon_skill_material: {
				1: 2,
			},
			tiered_forgery_weapon_skill_material: {
				1: 2,
			},
		},
	},
	{
		level: 3,
		materials: {
			shell_credit: 2000,
			tiered_enemy_drop_weapon_skill_material: {
				1: 3,
			},
			tiered_forgery_weapon_skill_material: {
				1: 3,
			},
		},
	},
	{
		level: 4,
		materials: {
			shell_credit: 4500,
			tiered_enemy_drop_weapon_skill_material: {
				2: 2,
			},
			tiered_forgery_weapon_skill_material: {
				2: 2,
			},
		},
	},
	{
		level: 5,
		materials: {
			shell_credit: 6000,
			tiered_enemy_drop_weapon_skill_material: {
				2: 3,
			},
			tiered_forgery_weapon_skill_material: {
				2: 3,
			},
		},
	},
	{
		level: 6,
		materials: {
			shell_credit: 16000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 2,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
		},
	},
	{
		level: 7,
		materials: {
			shell_credit: 30000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 5,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	{
		level: 8,
		materials: {
			shell_credit: 50000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 2,
			},
			tiered_forgery_weapon_skill_material: {
				4: 2,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	{
		level: 9,
		materials: {
			shell_credit: 70000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 3,
			},
			tiered_forgery_weapon_skill_material: {
				4: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	{
		level: 10,
		materials: {
			shell_credit: 100000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 4,
			},
			tiered_forgery_weapon_skill_material: {
				4: 6,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
];

export const passiveSkillLevellingMaterialsCount = {
	passive_skill_1: {
		materials: {
			shell_credit: 10000,
			tiered_enemy_drop_weapon_skill_material: {
				2: 3,
			},
			tiered_forgery_weapon_skill_material: {
				2: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	passive_skill_2: {
		materials: {
			shell_credit: 20000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	bonus_stat_tier_1_stat_1: {
		materials: {
			shell_credit: 50000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
		},
	},
	bonus_stat_tier_1_stat_2: {
		materials: {
			shell_credit: 50000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
		},
	},
	bonus_stat_tier_1_stat_3: {
		materials: {
			shell_credit: 50000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
		},
	},
	bonus_stat_tier_1_stat_4: {
		materials: {
			shell_credit: 50000,
			tiered_enemy_drop_weapon_skill_material: {
				3: 3,
			},
			tiered_forgery_weapon_skill_material: {
				3: 3,
			},
		},
	},
	bonus_stat_tier_2_stat_1: {
		materials: {
			shell_credit: 100000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 3,
			},
			tiered_forgery_weapon_skill_material: {
				4: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	bonus_stat_tier_2_stat_2: {
		materials: {
			shell_credit: 100000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 3,
			},
			tiered_forgery_weapon_skill_material: {
				4: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	bonus_stat_tier_2_stat_3: {
		materials: {
			shell_credit: 100000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 3,
			},
			tiered_forgery_weapon_skill_material: {
				4: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
	bonus_stat_tier_2_stat_4: {
		materials: {
			shell_credit: 100000,
			tiered_enemy_drop_weapon_skill_material: {
				4: 3,
			},
			tiered_forgery_weapon_skill_material: {
				4: 3,
			},
			weekly_boss_skill_upgrade_material: 1,
		},
	},
};

export const activeSkills = [
	'basic_attack',
	'resonance_skill',
	'forte_circuit',
	'resonance_liberation',
	'intro_skill',
];

export const passiveSkills = [
	'passive_skill_1',
	'bonus_stat_tier_1_stat_1',
	'bonus_stat_tier_1_stat_2',
	'bonus_stat_tier_1_stat_3',
	'bonus_stat_tier_1_stat_4',
	'passive_skill_2',
	'bonus_stat_tier_2_stat_1',
	'bonus_stat_tier_2_stat_2',
	'bonus_stat_tier_2_stat_3',
	'bonus_stat_tier_2_stat_4',
];

export const tieredPassiveSkills = {
	tier_1: [
		'passive_skill_1',
		'bonus_stat_tier_1_stat_1',
		'bonus_stat_tier_1_stat_2',
		'bonus_stat_tier_1_stat_3',
		'bonus_stat_tier_1_stat_4',
	],
	tier_2: [
		'passive_skill_2',
		'bonus_stat_tier_2_stat_1',
		'bonus_stat_tier_2_stat_2',
		'bonus_stat_tier_2_stat_3',
		'bonus_stat_tier_2_stat_4',
	],
};

import gameCharacterRawData from '@/data/game/raw/character.json';

export const characters = gameCharacterRawData;

export function charLevellingMaterialsCount(characterName = '') {
	// here is characters that have custom modifiers

	// ROVER
	if (
		typeof characterName === 'string' &&
		characterName.toLowerCase().startsWith('rover')
	) {
		// deep copy the data. smh.
		let data = JSON.parse(JSON.stringify(baseCharLevellingMaterialsCount));
		data[4]['materials']['boss_ascension_material'] = 1;
		data[6]['materials']['boss_ascension_material'] = 1;
		data[8]['materials']['boss_ascension_material'] = 1;
		data[10]['materials']['boss_ascension_material'] = 1;
		data[12]['materials']['boss_ascension_material'] = 1;

		return data;
	}

	return baseCharLevellingMaterialsCount;
}
