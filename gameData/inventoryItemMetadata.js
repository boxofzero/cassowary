export const boss_ascension_material = {
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

export const weekly_boss_skill_upgrade_material = {
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
	},
	medium_resonance_potion: {
		icon: 'exp-weapon-1.png',
		exp_value: 3000,
	},
	advanced_resonance_potion: {
		icon: 'exp-weapon-1.png',
		exp_value: 8000,
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
	},
	medium_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 3000,
	},
	advanced_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 8000,
	},
	premium_energy_core: {
		icon: 'exp-weapon-1.png',
		exp_value: 20000,
	},
};

export const enemy_drop_weapon_skill_material = {
	howler_core: {
		1: {
			name: 'lf_howler_core',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mf_howler_core',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'hf_howler_core',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'ff_howler_core',
			icon: 'exp-weapon-1.png',
		},
	},

	whisperin_core: {
		1: {
			name: 'lf_whisperin_core',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mf_whisperin_core',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'hf_whisperin_core',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'ff_whisperin_core',
			icon: 'exp-weapon-1.png',
		},
	},

	mask: {
		1: {
			name: 'mask_of_constraint',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'mask_of_erosion',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'mask_of_distortion',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'mask_of_insanity',
			icon: 'exp-weapon-1.png',
		},
	},
	ring: {
		1: {
			name: 'crude_ring',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'basic_ring',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'improved_ring',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'tailored_ring',
			icon: 'exp-weapon-1.png',
		},
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
	cadence: {
		1: {
			name: 'cadence_seed',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'cadence_bud',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'cadence_leaf',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'cadence_blossom',
			icon: 'exp-weapon-1.png',
		},
	},

	phlohiston: {
		1: {
			name: 'impure_phlohiston',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'extracted_phlohiston',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'refined_phlohiston',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'flawless_phlohiston',
			icon: 'exp-weapon-1.png',
		},
	},

	metallic_drip: {
		1: {
			name: 'inert_metallic_drip',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'reactive_metallic_drip',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'polarized_metallic_drip',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'heterized_metallic_drip',
			icon: 'exp-weapon-1.png',
		},
	},

	helix: {
		1: {
			name: 'lento_helix',
			icon: 'exp-weapon-0.png',
			synthesizable: {
				to: 2,
				count: 3,
			},
		},
		2: {
			name: 'adagio_helix',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 3,
				count: 3,
			},
		},
		3: {
			name: 'andante_helix',
			icon: 'exp-weapon-1.png',
			synthesizable: {
				to: 4,
				count: 3,
			},
		},
		4: {
			name: 'presto_helix',
			icon: 'exp-weapon-1.png',
		},
	},
};

export const overworld_resource_ascension_material = {
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

export const credit = {
	icon: 'x.png',
};
