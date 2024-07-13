// TODO
// this is supposed to be a skeleton for the data object
// data will be served from somewhere

/*

*/

export const characterFormScheme = {
	name: '',
	char_current_level: '1',
	char_target_level: '1', // 1,50,50A,60,60A,70,70A,80,80A,90
	basic_attack_current_level: 1,
	basic_attack_target_level: 1,
	resonance_skill_current_level: 1,
	resonance_skill_target_level: 1,
	forte_circuit_current_level: 1,
	forte_circuit_target_level: 1,
	resonance_liberation_current_level: 1,
	resonance_liberation_target_level: 1,
	intro_skill_current_level: 1,
	intro_skill_target_level: 1,
	passive_skill_1: undefined,
	passive_skill_2: undefined,
	bonus_stat_tier_1_stat_1: undefined,
	bonus_stat_tier_1_stat_2: undefined,
	bonus_stat_tier_1_stat_3: undefined,
	bonus_stat_tier_1_stat_4: undefined,
	bonus_stat_tier_2_stat_1: undefined,
	bonus_stat_tier_2_stat_2: undefined,
	bonus_stat_tier_2_stat_3: undefined,
	bonus_stat_tier_2_stat_4: undefined,
};

export const plannedCharactersV2 = {
	yinlin: {
		char_current_level: '1',
		char_target_level: '80A', // 1,50,50A,60,60A,70,70A,80,80A,90
		basic_attack_current_level: 1,
		basic_attack_target_level: 6,
		resonance_skill_current_level: 1,
		resonance_skill_target_level: 6,
		forte_circuit_current_level: 1,
		forte_circuit_target_level: 6,
		resonance_liberation_current_level: 1,
		resonance_liberation_target_level: 6,
		intro_skill_current_level: 1,
		intro_skill_target_level: 6,
		passive_skill_1: 0,
		passive_skill_2: 0,
		bonus_stat_tier_1_stat_1: 0,
		bonus_stat_tier_1_stat_2: 0,
		bonus_stat_tier_1_stat_3: 0,
		bonus_stat_tier_1_stat_4: 0,
		bonus_stat_tier_2_stat_1: 0,
		bonus_stat_tier_2_stat_2: 0,
		bonus_stat_tier_2_stat_3: 0,
		bonus_stat_tier_2_stat_4: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
};

export const plannedCharacters = {
	yinlin: {
		level: {
			current: '1',
			target: '80A', // 1,50,50A,60,60A,70,70A,80,80A,90
		},
		active_skills: {
			basic_attack: { current: 1, target: 6 },
			resonance_skill: { current: 1, target: 6 },
			forte_circuit: { current: 1, target: 6 },
			resonance_liberation: { current: 1, target: 6 },
		},
		passive_skills: [
			{ current: 0, target: 1 },
			{ current: 0, target: 1 },
		],
		bonus_stats: [
			[
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
			],
			[
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
				{ current: 0, target: 1 },
			],
		],
	},
};
