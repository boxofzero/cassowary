// TODO
// this is supposed to be a skeleton for the data object
// data will be served from somewhere
export const characters = {
	yinlin: {
		weapon: 'rectifier',
		materials: {
			ascension_material: 'coriolus',
			resonator_ascension_material: 'group_abomination_tacet_core',
			weapon_skill_material_enemy_drop: 'whispering_core',
			skill_upgrade_material: 'dreamless_feather',
			weapon_skill_material: 'helix',
		},
		skill_tree: {
			basic_attack: {
				next: {
					stat: {
						type: 'crit_rate',
						value: 0.012,
					},
					next: {
						stat: {
							type: 'crit_rate',
							value: 0.028,
						},
					},
				},
			},
			resonance_skill: {
				next: {
					stat: {
						type: 'crit_rate',
						value: 0.012,
					},
					next: {
						stat: {
							type: 'crit_rate',
							value: 0.028,
						},
					},
				},
			},
			forte_circuit: {
				next: {
					stat: {
						type: 'crit_rate',
						value: 0.012,
					},
					next: {
						stat: {
							type: 'crit_rate',
							value: 0.028,
						},
					},
				},
			},
			resonance_liberation: {
				next: {
					stat: {
						type: 'crit_rate',
						value: 0.012,
					},
					next: {
						stat: {
							type: 'crit_rate',
							value: 0.028,
						},
					},
				},
			},
			inherent_skill: {
				next: {
					stat: {
						type: 'crit_rate',
						value: 0.012,
					},
					next: {
						stat: {
							type: 'crit_rate',
							value: 0.028,
						},
					},
				},
			},
		},
	},
};
