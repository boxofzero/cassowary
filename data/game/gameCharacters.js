export const charLevellingMaterialsCount = [
	// TODO fix exp and credit levelling number counts
	{ level: '1', materials: {} },
	{ level: '20', materials: { char_exp: 33300, credit: 11655 } },
	{
		level: '20A',
		materials: {
			tiered_enemy_drop_weapon_skill_material: {
				1: 4,
			},
			credit: 5000,
		},
	},
	{ level: '40', materials: { char_exp: 175500, credit: 61425 } },
	{
		level: '40A',
		materials: {
			boss_ascension_material: 3,
			overworld_resource_ascension_material: 4,
			tiered_enemy_drop_weapon_skill_material: {
				2: 4,
			},
			credit: 10000,
		},
	},
	{ level: '50', materials: { char_exp: 188300, credit: 65905 } },
	{
		level: '50A',
		materials: {
			boss_ascension_material: 6,
			overworld_resource_ascension_material: 8,
			tiered_enemy_drop_weapon_skill_material: {
				2: 8,
			},
			credit: 10000,
		},
	},
	{ level: '60', materials: { char_exp: 286600, credit: 100310 } },
	{
		level: '60A',
		materials: {
			boss_ascension_material: 9,
			overworld_resource_ascension_material: 12,
			tiered_enemy_drop_weapon_skill_material: {
				3: 4,
			},
			credit: 20000,
		},
	},
	{ level: '70', materials: { char_exp: 413000, credit: 144550 } },
	{
		level: '70A',
		materials: {
			boss_ascension_material: 12,
			overworld_resource_ascension_material: 16,
			tiered_enemy_drop_weapon_skill_material: {
				3: 8,
			},
			credit: 40000,
		},
	},
	{ level: '80', materials: { char_exp: 572400, credit: 200340 } },
	{
		level: '80A',
		materials: {
			boss_ascension_material: 16,
			overworld_resource_ascension_material: 20,
			tiered_enemy_drop_weapon_skill_material: {
				4: 4,
			},
			credit: 80000,
		},
	},
	{ level: '90', materials: { char_exp: 768900, credit: 269115 } },
];

export const activeSkillLevellingMaterialsCount = [
	{ level: 1, materials: {} },
	{
		level: 2,
		materials: {
			credit: 1500,
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
			credit: 2000,
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
			credit: 4500,
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
			credit: 6000,
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
			credit: 16000,
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
			credit: 30000,
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
			credit: 50000,
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
			credit: 70000,
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
			credit: 100000,
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
			credit: 10000,
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
			credit: 20000,
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
			credit: 50000,
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
			credit: 50000,
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
			credit: 50000,
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
			credit: 50000,
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
			credit: 100000,
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
			credit: 100000,
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
			credit: 100000,
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
			credit: 100000,
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

export const characters = {
	yinlin: {
		game_id: 1302,
		weapon: 'rectifier',
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		tiered_forgery_weapon_skill_material: 'helix',
		boss_ascension_material: 'group_abomination_tacet_core',
		overworld_resource_ascension_material: 'coriolus',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		bonus_stats: [
			[
				{ stat: 'crit_rate', value: 0.012 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'crit_rate', value: 0.012 },
			],
			[
				{ stat: 'crit_rate', value: 0.028 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'crit_rate', value: 0.028 },
			],
		],
	},
	roverHavoc: {
		game_id: 1604,
		weapon: 'sword',
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		boss_ascension_material: 'mysterious_code',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		bonus_stats: [
			[
				{ stat: 'havoc_dmg_percent', value: 0.018 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'havoc_dmg_percent', value: 0.018 },
			],
			[
				{ stat: 'havoc_dmg_percent', value: 0.042 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'havoc_dmg_percent', value: 0.042 },
			],
		],
	},
	changli: {
		id: 1205,
		weapon: 'sword',
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'rage_tacet_core',
		overworld_resource_ascension_material: 'pavo_plum',
		weekly_boss_skill_upgrade_material: 'sentinel_dagger',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			[
				{ stat: 'crit_rate', value: 0.012 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'atk_percent', value: 0.018 },
				{ stat: 'crit_rate', value: 0.012 },
			],
			[
				{ stat: 'crit_rate', value: 0.028 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'atk_percent', value: 0.042 },
				{ stat: 'crit_rate', value: 0.028 },
			],
		],
	},
};
