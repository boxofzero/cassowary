export const boss_ascension_material = {
	mysterious_code: {
		count: 0,
	},
	elegy_tacet_core: {
		count: 0,
	},
	gold_dissolving_feather: {
		count: 0,
	},
	group_abomination_tacet_core: {
		count: 0,
	},
	hidden_thunder_tacet_core: {
		count: 0,
	},
	rage_tacet_core: {
		count: 0,
	},
	roaring_rock_fist: {
		count: 0,
	},
	sound_keeping_tacet_core: {
		count: 0,
	},
	strife_tacet_core: {
		count: 0,
	},
	thundering_tacet_core: {
		count: 0,
	},
};

export const weekly_boss_skill_upgrade_material = {
	dreamless_feather: {
		count: 0,
	},
	monument_bell: {
		count: 0,
	},
	unending_destruction: {
		count: 0,
	},
};

export const resonator_exp_material = {
	// resonance_potion
	basic_resonance_potion: {
		count: 0,
	},
	medium_resonance_potion: {
		count: 0,
	},
	advanced_resonance_potion: {
		count: 0,
	},
	premium_resonance_potion: {
		count: 0,
	},
};

export const weapon_exp_material = {
	// energy_core
	basic_energy_core: {
		count: 0,
	},
	medium_energy_core: {
		count: 0,
	},
	advanced_energy_core: {
		count: 0,
	},
	premium_energy_core: {
		count: 0,
	},
};

export const enemy_drop_weapon_skill_material = {
	// ff_howler_core
	lf_howler_core: {
		count: 0,
	},
	mf_howler_core: {
		count: 0,
	},
	hf_howler_core: {
		count: 0,
	},
	ff_howler_core: {
		count: 0,
	},

	// whisperin_core
	lf_whisperin_core: {
		count: 0,
	},
	mf_whisperin_core: {
		count: 0,
	},
	hf_whisperin_core: {
		count: 0,
	},
	ff_whisperin_core: {
		count: 0,
	},

	// mask
	mask_of_constraint: {
		count: 0,
	},
	mask_of_erosion: {
		count: 0,
	},
	mask_of_distortion: {
		count: 0,
	},
	mask_of_insanity: {
		count: 0,
	},

	// ring
	crude_ring: {
		count: 0,
	},
	basic_ring: {
		count: 0,
	},
	improved_ring: {
		count: 0,
	},
	tailored_ring: {
		count: 0,
	},
};

export const echo_development_material = {
	// tuner
	basic_tuner: {
		count: 0,
	},
	medium_tuner: {
		count: 0,
	},
	advanced_tuner: {
		count: 0,
	},
	premium_tuner: {
		count: 0,
	},

	// sealed_tube
	basic_sealed_tube: {
		count: 0,
	},
	medium_sealed_tube: {
		count: 0,
	},
	advanced_sealed_tube: {
		count: 0,
	},
	premium_sealed_tube: {
		count: 0,
	},
};

export const forgery_weapon_skill_material = {
	// cadence
	cadence_seed: {
		count: 0,
	},
	cadence_bud: {
		count: 0,
	},
	cadence_leaf: {
		count: 0,
	},
	cadence_blossom: {
		count: 0,
	},

	// phlohiston
	impure_phlohiston: {
		count: 0,
	},
	extracted_phlohiston: {
		count: 0,
	},
	refined_phlohiston: {
		count: 0,
	},
	flawless_phlohiston: {
		count: 0,
	},

	// metallic_drip
	inert_metallic_drip: {
		count: 0,
	},
	reactive_metallic_drip: {
		count: 0,
	},
	polarized_metallic_drip: {
		count: 0,
	},
	heterized_metallic_drip: {
		count: 0,
	},

	// helix
	lento_helix: {
		count: 0,
	},
	adagio_helix: {
		count: 0,
	},
	andante_helix: {
		count: 0,
	},
	presto_helix: {
		count: 0,
	},
};

export const overworld_resource_ascension_material = {
	belle_poppy: {
		count: 0,
	},
	coriolus: {
		count: 0,
	},
	iris: {
		count: 0,
	},
	lanternberry: {
		count: 0,
	},
	pavo_plum: {
		count: 0,
	},
	pecok_flower: {
		count: 0,
	},
	terraspawn_fungus: {
		count: 0,
	},
	violet_coral: {
		count: 0,
	},
	wintry_bell: {
		count: 0,
	},
};

// inventory contains inventory items (materials)
// exp, credit: material type -> count
// materials type -> material -> count, meta
// tiered materials type -> material -> tierMaterial -> count, meta

export const inventoryItems = {
	boss_ascension_material: boss_ascension_material,
	weekly_boss_skill_upgrade_material: weekly_boss_skill_upgrade_material,
	resonator_exp_material: resonator_exp_material,
	weapon_exp_material: weapon_exp_material,
	enemy_drop_weapon_skill_material: enemy_drop_weapon_skill_material,
	echo_development_material: echo_development_material,
	forgery_weapon_skill_material: forgery_weapon_skill_material,
	overworld_resource_ascension_material: overworld_resource_ascension_material,
	credit: 0,
};

export const materialNeeded = {
	enemy_drop_weapon_skill_material: enemy_drop_weapon_skill_material,
	boss_ascension_material: boss_ascension_material,
	overworld_resource_ascension_material: overworld_resource_ascension_material,
	forgery_weapon_skill_material: forgery_weapon_skill_material,
	weekly_boss_skill_upgrade_material: weekly_boss_skill_upgrade_material,
	resonator_exp_material: resonator_exp_material,
	weapon_exp_material: weapon_exp_material,
	credit: 0,
};
