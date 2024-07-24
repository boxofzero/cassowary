/*
  This is for configured data, such as tiered materials
*/

export const tiered_enemy_drop_weapon_skill_material = {
	howler_core: {
		1: {
			name: 'lf_howler_core',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mf_howler_core',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'hf_howler_core',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'ff_howler_core',
		},
	},

	whisperin_core: {
		1: {
			name: 'lf_whisperin_core',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mf_whisperin_core',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'hf_whisperin_core',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'ff_whisperin_core',
		},
	},

	mask: {
		1: {
			name: 'mask_of_constraint',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mask_of_erosion',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'mask_of_distortion',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'mask_of_insanity',
		},
	},
	ring: {
		1: {
			name: 'crude_ring',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'basic_ring',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'improved_ring',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'tailored_ring',
		},
	},
};

export const tiered_forgery_weapon_skill_material = {
	cadence: {
		1: {
			name: 'cadence_seed',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'cadence_bud',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'cadence_leaf',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'cadence_blossom',
		},
	},

	phlohiston: {
		1: {
			name: 'impure_phlohiston',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'extracted_phlohiston',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'refined_phlohiston',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'flawless_phlohiston',
		},
	},

	metallic_drip: {
		1: {
			name: 'inert_metallic_drip',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'reactive_metallic_drip',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'polarized_metallic_drip',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'heterized_metallic_drip',
		},
	},

	helix: {
		1: {
			name: 'lento_helix',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'adagio_helix',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'andante_helix',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'presto_helix',
		},
	},

	waveworn_residue: {
		1: {
			name: 'waveworn_residue_210',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'waveworn_residue_226',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'waveworn_residue_235',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'waveworn_residue_239',
		},
	},
};

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

export const tiered_materials = {
	tiered_enemy_drop_weapon_skill_material:
		tiered_enemy_drop_weapon_skill_material,
	tiered_forgery_weapon_skill_material: tiered_forgery_weapon_skill_material,
};

export const exp_data = {
	weap_exp: weapon_exp_material,
	char_exp: resonator_exp_material,
};
