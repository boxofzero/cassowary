export const resonator_ascension_boss_material = {
	mysterious_code: {
		icon: 'x.png',
	},
	elegy_tacet_core: {
		icon: 'x.png',
	},
	gold_dissolving_feather: {
		display_name: 'Gold-Dissolving Feather',
		icon: 'x.png',
	},
	group_abomination_tacet_core: {
		icon: 'x.png',
	},
	hidden_thunder_tacet_core: {
		icon: 'x.png',
	},
	rage_tacet_core: {
		icon: 'x.png',
	},
	roaring_rock_fist: {
		icon: 'x.png',
	},
	sound_keeping_tacet_core: {
		display_name: 'Sound-Keeping Tacet Core',
		icon: 'x.png',
	},
	strife_tacet_core: {
		icon: 'x.png',
	},
	thundering_tacet_core: {
		icon: 'x.png',
	},
};

export const skill_upgrade_material = {
	dreamless_feather: {
		icon: 'x.png',
	},
	monument_bell: {
		icon: 'x.png',
	},
	unending_destruction: {
		icon: 'x.png',
	},
};

export const resonator_exp_material = {
	// resonance_potion
	basic_resonance_potion: {
		icon: 'exp-weapon-1.png',
		exp_value: 1000,
		synthesizable: {
			to: 'medium_resonance_potion',
		},
	},
	medium_resonance_potion: {
		icon: 'exp-weapon-1.png',
		exp_value: 3000,
		synthesizable: {
			to: 'advanced_resonance_potion',
		},
	},
	advanced_resonance_potion: {
		icon: 'exp-weapon-1.png',
		exp_value: 8000,
		synthesizable: {
			to: 'premium_resonance_potion',
		},
	},
	premium_resonance_potion: {
		icon: 'exp-weapon-0.png',
		exp_value: 20000,
	},
};

export const weapon_exp_material = {
	// energy_core
	basic_energy_core: {
		icon: 'exp-weapon-0.png',
		exp_value: 1000,
		synthesizable: {
			to: 'medium_energy_core',
		},
	},
	medium_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 3000,
		synthesizable: {
			to: 'advanced_energy_core',
		},
	},
	advanced_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 8000,
		synthesizable: {
			to: 'premium_energy_core',
		},
	},
	premium_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 20000,
	},
};

export const weapon_skill_material_enemy_drop = {
	// display_name: 'Weapon & Skill Material (Enemy Drops)',
	// ff_howler_core
	lf_howler_core: {
		icon: 'exp-weapon-0.png',
		synthesizable: {
			to: 'mf_howler_core',
		},
	},
	mf_howler_core: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'hf_howler_core',
		},
	},
	hf_howler_core: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'ff_howler_core',
		},
	},
	ff_howler_core: {
		icon: 'exp-weapon-1.png',
	},

	// whisperin_core
	lf_whisperin_core: {
		icon: 'exp-weapon-0.png',
		synthesizable: {
			to: 'mf_whisperin_core',
		},
	},
	mf_whisperin_core: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'hf_whisperin_core',
		},
	},
	hf_whisperin_core: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'ff_whisperin_core',
		},
	},
	ff_whisperin_core: {
		icon: 'exp-weapon-1.png',
	},

	// mask
	mask_of_constraint: {
		icon: 'exp-weapon-0.png',
		synthesizable: {
			to: 'mask_of_erosion',
		},
	},
	mask_of_erosion: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'mask_of_distortion',
		},
	},
	mask_of_distortion: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'mask_of_insanity',
		},
	},
	mask_of_insanity: {
		icon: 'exp-weapon-1.png',
	},

	// ring
	crude_ring: {
		icon: 'exp-weapon-0.png',
		synthesizable: {
			to: 'basic_ring',
		},
	},
	basic_ring: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'improved_ring',
		},
	},
	improved_ring: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'tailored_ring',
		},
	},
	tailored_ring: {
		icon: 'exp-weapon-1.png',
	},
};

export const echo_development_material = {
	// tuner
	basic_tuner: {
		icon: 'exp-weapon-0.png',
		synthesizable: {
			to: 'medium_tuner',
		},
	},
	medium_tuner: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'advanced_tuner',
		},
	},
	advanced_tuner: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'premium_tuner',
		},
	},
	premium_tuner: {
		icon: 'exp-weapon-1.png',
	},

	// sealed_tube
	basic_sealed_tube: {
		icon: 'exp-weapon-0.png',
		exp_value: 5000,
		synthesizable: {
			to: 'medium_sealed_tube',
		},
	},
	medium_sealed_tube: {
		icon: 'exp-weapon-1.png',
		exp_value: 2000,
		synthesizable: {
			to: 'advanced_sealed_tube',
		},
	},
	advanced_sealed_tube: {
		icon: 'exp-weapon-1.png',
		exp_value: 1000,
		synthesizable: {
			to: 'premium_sealed_tube',
		},
	},
	premium_sealed_tube: {
		icon: 'exp-weapon-1.png',
		exp_value: 500,
	},
};

export const weapon_skill_material = {
	// cadence
	cadence_seed: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'cadence_bud',
		},
	},
	cadence_bud: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'cadence_leaf',
		},
	},
	cadence_leaf: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'cadence_blossom',
		},
	},
	cadence_blossom: {
		icon: 'exp-weapon-1.png',
	},

	// phlohiston
	impure_phlohiston: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'extracted_phlohiston',
		},
	},
	extracted_phlohiston: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'refined_phlohiston',
		},
	},
	refined_phlohiston: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'flawless_phlohiston',
		},
	},
	flawless_phlohiston: {
		icon: 'exp-weapon-1.png',
	},

	// metallic_drip
	inert_metallic_drip: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'reactive_metallic_drip',
		},
	},
	reactive_metallic_drip: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'polarized_metallic_drip',
		},
	},
	polarized_metallic_drip: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'heterized_metallic_drip',
		},
	},
	heterized_metallic_drip: {
		icon: 'exp-weapon-1.png',
	},

	// helix
	lento_helix: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'adagio_helix',
		},
	},
	adagio_helix: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'andante_helix',
		},
	},
	andante_helix: {
		icon: 'exp-weapon-1.png',
		synthesizable: {
			to: 'presto_helix',
		},
	},
	presto_helix: {
		icon: 'exp-weapon-1.png',
	},
};

export const ascension_material = {
	belle_poppy: {
		icon: 'x.png',
	},
	coriolus: {
		icon: 'x.png',
	},
	iris: {
		icon: 'x.png',
	},
	lanternberry: {
		icon: 'x.png',
	},
	pavo_plum: {
		icon: 'x.png',
	},
	pecok_flower: {
		icon: 'x.png',
	},
	terraspawn_fungus: {
		icon: 'x.png',
	},
	violet_coral: {
		icon: 'x.png',
	},
	wintry_bell: {
		icon: 'x.png',
	},
};

export const inventoryItems = {
	resonator_ascension_boss_material: resonator_ascension_boss_material,
	skill_upgrade_material: skill_upgrade_material,
	resonator_exp_material: resonator_exp_material,
	weapon_exp_material: weapon_exp_material,
	weapon_skill_material_enemy_drop: weapon_skill_material_enemy_drop,
	echo_development_material: echo_development_material,
	weapon_skill_material: weapon_skill_material,
	ascension_material: ascension_material,
};
