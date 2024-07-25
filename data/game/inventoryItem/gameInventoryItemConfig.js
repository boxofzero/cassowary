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

export const tiered_forgery_weapon_skill_material_2 = {
	cadence_seed: {
		to: 'cadence_bud',
		cost: 3,
	},
	cadence_bud: {
		from: 'cadence_seed',
		to: 'cadence_leaf',
		cost: 3,
	},
	cadence_leaf: {
		from: 'cadence_bud',
		to: 'cadence_blossom',
		cost: 3,
	},
	cadence_blossom: {
		from: 'cadence_leaf',
	},

	impure_phlohiston: {
		to: 'extracted_phlohiston',
		cost: 3,
	},
	extracted_phlohiston: {
		from: 'impure_phlohiston',
		to: 'refined_phlohiston',
		cost: 3,
	},
	refined_phlohiston: {
		from: 'extracted_phlohiston',
		to: 'flawless_phlohiston',
		cost: 3,
	},

	flawless_phlohiston: {
		from: 'refined_phlohiston',
	},

	inert_metallic_drip: {
		to: 'reactive_metallic_drip',
		cost: 3,
	},
	reactive_metallic_drip: {
		from: 'inert_metallic_drip',
		to: 'polarized_metallic_drip',
		cost: 3,
	},
	polarized_metallic_drip: {
		from: 'reactive_metallic_drip',
		to: 'heterized_metallic_drip',
		cost: 3,
	},
	heterized_metallic_drip: {
		from: 'polarized_metallic_drip',
	},

	lento_helix: {
		to: 'adagio_helix',
		cost: 3,
	},
	adagio_helix: {
		from: 'lento_helix',
		to: 'andante_helix',
		cost: 3,
	},
	andante_helix: {
		from: 'adagio_helix',
		to: 'presto_helix',
		cost: 3,
	},
	presto_helix: {
		from: 'andante_helix',
	},

	waveworn_residue_210: {
		to: 'waveworn_residue_226',
		cost: 3,
	},
	waveworn_residue_226: {
		from: 'waveworn_residue_210',
		to: 'waveworn_residue_235',
		cost: 3,
	},
	waveworn_residue_235: {
		from: 'waveworn_residue_226',
		to: 'waveworn_residue_239',
		cost: 3,
	},
	waveworn_residue_239: {
		from: 'waveworn_residue_235',
	},
};

export const tiered_enemy_drop_weapon_skill_material_2 = {
	lf_howler_core: {
		to: 'mf_howler_core',
		cost: 3,
	},
	mf_howler_core: {
		from: 'lf_howler_core',
		to: 'hf_howler_core',
		cost: 3,
	},
	hf_howler_core: {
		from: 'mf_howler_core',
		to: 'ff_howler_core',
		cost: 3,
	},
	ff_howler_core: {
		from: 'hf_howler_core',
	},

	lf_whisperin_core: {
		to: 'mf_whisperin_core',
		cost: 3,
	},
	mf_whisperin_core: {
		from: 'lf_whisperin_core',
		to: 'hf_whisperin_core',
		cost: 3,
	},
	hf_whisperin_core: {
		from: 'mf_whisperin_core',
		to: 'ff_whisperin_core',
		cost: 3,
	},
	ff_whisperin_core: {
		from: 'hf_whisperin_core',
	},

	mask_of_constraint: {
		to: 'mask_of_erosion',
		cost: 3,
	},
	mask_of_erosion: {
		from: 'mask_of_constraint',
		to: 'mask_of_distortion',
		cost: 3,
	},
	mask_of_distortion: {
		from: 'mask_of_erosion',
		to: 'mask_of_insanity',
		cost: 3,
	},
	mask_of_insanity: {
		from: 'mask_of_distortion',
	},

	crude_ring: {
		to: 'basic_ring',
		cost: 3,
	},
	basic_ring: {
		from: 'crude_ring',
		to: 'improved_ring',
		cost: 3,
	},
	improved_ring: {
		from: 'basic_ring',
		to: 'tailored_ring',
		cost: 3,
	},
	tailored_ring: {
		from: 'improved_ring',
	},
};

export const tiered_materials_2 = {
	...tiered_enemy_drop_weapon_skill_material_2,
	...tiered_forgery_weapon_skill_material_2,
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
