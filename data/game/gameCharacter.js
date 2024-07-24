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
	sanhua: {
		game_id: 1102,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/sanhua-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'sound_keeping_tacet_core',
		overworld_resource_ascension_material: 'wintry_bell',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'glacio_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
		],
	},
	baizhi: {
		game_id: 1103,
		weapon: 'rectifier',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/baizhi-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'sound_keeping_tacet_core',
		overworld_resource_ascension_material: 'lanternberry',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'helix',
		bonus_stats: [
			{
				stat: 'healing_bonus',
				value: 0.018,
			},
			{
				stat: 'hp',
				value: 0.018,
			},
			{
				stat: 'hp',
				value: 0.018,
			},
			{
				stat: 'healing_bonus',
				value: 0.018,
			},
			{
				stat: 'healing_bonus',
				value: 0.042,
			},
			{
				stat: 'hp',
				value: 0.042,
			},
			{
				stat: 'hp',
				value: 0.042,
			},
			{
				stat: 'healing_bonus',
				value: 0.042,
			},
		],
	},
	lingyang: {
		game_id: 1104,
		weapon: 'gauntlets',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/lingyang-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'sound_keeping_tacet_core',
		overworld_resource_ascension_material: 'coriolus',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'cadence',
		bonus_stats: [
			{
				stat: 'glacio_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'glacio_dmg_bonus',
				value: 0.018,
			},
		],
	},
	zhezhi: {
		game_id: 1105,
		weapon: 'rectifier',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/zhezhi-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'sound_keeping_tacet_core',
		overworld_resource_ascension_material: 'lanternberry',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'helix',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	chixia: {
		game_id: 1202,
		weapon: 'pistols',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/chixia-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'rage_tacet_core',
		overworld_resource_ascension_material: 'belle_poppy',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'phlogiston',
		bonus_stats: [
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
		],
	},
	encore: {
		game_id: 1203,
		weapon: 'rectifier',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/encore-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'rage_tacet_core',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'helix',
		bonus_stats: [
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
		],
	},
	mortefi: {
		game_id: 1204,
		weapon: 'pistols',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/mortefi-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'rage_tacet_core',
		overworld_resource_ascension_material: 'coriolus',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'phlogiston',
		bonus_stats: [
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'fusion_dmg_bonus',
				value: 0.042,
			},
		],
	},
	changli: {
		game_id: 1205,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/changli-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'rage_tacet_core',
		overworld_resource_ascension_material: 'pavo_plum',
		weekly_boss_skill_upgrade_material: 'sentinels_dagger',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	calcharo: {
		game_id: 1301,
		weapon: 'broadblade',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/calcharo-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'thundering_tacet_core',
		overworld_resource_ascension_material: 'iris',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'waveworn_residue',
		bonus_stats: [
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_dmg',
				value: 0.056,
			},
			{
				stat: 'crit_dmg',
				value: 0.024,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_dmg',
				value: 0.024,
			},
			{
				stat: 'crit_dmg',
				value: 0.056,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
		],
	},
	yinlin: {
		game_id: 1302,
		weapon: 'rectifier',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/yinlin-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'group_abomination_tacet_core',
		overworld_resource_ascension_material: 'coriolus',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		tiered_forgery_weapon_skill_material: 'helix',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	yuanwu: {
		game_id: 1303,
		weapon: 'gauntlets',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/yuanwu-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'hidden_thunder_tacet_core',
		overworld_resource_ascension_material: 'terraspawn_fungus',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'cadence',
		bonus_stats: [
			{
				stat: 'electro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'def',
				value: 0.023,
			},
			{
				stat: 'def',
				value: 0.023,
			},
			{
				stat: 'electro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'electro_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'def',
				value: 0.053,
			},
			{
				stat: 'def',
				value: 0.053,
			},
			{
				stat: 'electro_dmg_bonus',
				value: 0.042,
			},
		],
	},
	jinhsi: {
		game_id: 1304,
		weapon: 'broadblade',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/jinhsi-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'elegy_tacet_core',
		overworld_resource_ascension_material: 'loongs_pearl',
		weekly_boss_skill_upgrade_material: 'sentinels_dagger',
		tiered_forgery_weapon_skill_material: 'waveworn_residue',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	yangyang: {
		game_id: 1402,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/yangyang-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'roaring_rock_fist',
		overworld_resource_ascension_material: 'wintry_bell',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
		],
	},
	aalto: {
		game_id: 1403,
		weapon: 'pistols',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/aalto-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'roaring_rock_fist',
		overworld_resource_ascension_material: 'wintry_bell',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'phlogiston',
		bonus_stats: [
			{
				stat: 'aero_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'aero_dmg_bonus',
				value: 0.042,
			},
		],
	},
	jiyan: {
		game_id: 1404,
		weapon: 'broadblade',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/jiyan-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'roaring_rock_fist',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'waveworn_residue',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	jianxin: {
		game_id: 1405,
		weapon: 'gauntlets',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/jianxin-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'roaring_rock_fist',
		overworld_resource_ascension_material: 'lanternberry',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'cadence',
		bonus_stats: [
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'crit_rate',
				value: 0.012,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'crit_rate',
				value: 0.028,
			},
		],
	},
	rover_male: {
		game_id: 1501,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/rover-male-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'mysterious_code',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'spectro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.042,
			},
		],
	},
	rover_female: {
		game_id: 1502,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/rover-female-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'mysterious_code',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'unending_destruction',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'spectro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'spectro_dmg_bonus',
				value: 0.042,
			},
		],
	},
	verina: {
		game_id: 1503,
		weapon: 'rectifier',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/verina-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'elegy_tacet_core',
		overworld_resource_ascension_material: 'belle_poppy',
		weekly_boss_skill_upgrade_material: 'monument_bell',
		tiered_forgery_weapon_skill_material: 'helix',
		bonus_stats: [
			{
				stat: 'healing_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'healing_bonus',
				value: 0.042,
			},
			{
				stat: 'healing_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'healing_bonus',
				value: 0.018,
			},
		],
	},
	taoqi: {
		game_id: 1601,
		weapon: 'broadblade',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/taoqi-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'howler_core',
		boss_ascension_material: 'gold_dissolving_feather',
		overworld_resource_ascension_material: 'iris',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		tiered_forgery_weapon_skill_material: 'waveworn_residue',
		bonus_stats: [
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'def',
				value: 0.023,
			},
			{
				stat: 'def',
				value: 0.023,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'def',
				value: 0.053,
			},
			{
				stat: 'def',
				value: 0.053,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
		],
	},
	danjin: {
		game_id: 1602,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/danjin-icon.webp',
		rarity: 4,
		tiered_enemy_drop_weapon_skill_material: 'ring',
		boss_ascension_material: 'strife_tacet_core',
		overworld_resource_ascension_material: 'belle_poppy',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
		],
	},
	rover_havoc_female: {
		game_id: 1604,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/rover-havoc-female-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'mysterious_code',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
		],
	},
	rover_havoc_male: {
		game_id: 1605,
		weapon: 'sword',
		icon: 'https://static.dotgg.gg/wuthering-waves/characters/rover-havoc-male-icon.webp',
		rarity: 5,
		tiered_enemy_drop_weapon_skill_material: 'whisperin_core',
		boss_ascension_material: 'mysterious_code',
		overworld_resource_ascension_material: 'pecok_flower',
		weekly_boss_skill_upgrade_material: 'dreamless_feather',
		tiered_forgery_weapon_skill_material: 'metallic_drip',
		bonus_stats: [
			{
				stat: 'atk',
				value: 0.042,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'atk',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.018,
			},
			{
				stat: 'havoc_dmg_bonus',
				value: 0.042,
			},
			{
				stat: 'atk',
				value: 0.042,
			},
		],
	},
};
