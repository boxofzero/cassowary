import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
} from '@/services/planner/utilities';
import * as gameWeapons from '~/data/game/gameWeapon';

/**
 * Retrieves the materials needed for a weapon based on their current level and target level.
 *
 * @param {string} weaponName - The name of the weapon.
 * @return {Object} An object containing the materials needed for the weapon, with the material type as the key and the quantity as the value.
 */
export const getWeaponNeededMaterials = (weaponName) => {
	// init plannedWeapons, inventoryItems
	usePlannedWeaponStore().init();
	useInventoryItemStore().init();

	// get plannedWeapon
	const plannedWeapon = usePlannedWeaponStore().plannedWeapons[weaponName];
	if (!plannedWeapon) return {};
	// temporary assign name for business logic
	plannedWeapon['name'] = weaponName;

	const currentLevel = plannedWeapon.weap_current_level;
	const targetLevel = plannedWeapon.weap_target_level;

	const weaponRarity = gameWeapons.weapons[weaponName].rarity;

	const levelsToFarm = {
		weapLevel: getLevelRangeDiff(
			gameWeapons.weaponLevellingMaterialsCount[weaponRarity],
			currentLevel,
			targetLevel
		),
	};

	// calculate all materials needed
	// at this level, the materials already flatten, not tiered
	const materialsNeeded = getMaterialsFromLevelListStatList(
		weaponName,
		{
			...levelsToFarm,
		},
		gameWeapons.weapons
	);

	return materialsNeeded;
};

export const getAllWeaponsNeededMaterials = () => {
	usePlannedWeaponStore().init();
	let weapons = usePlannedWeaponStore().plannedWeapons;
	if (!weapons) return {};
	return getWeaponsNeededMaterials(useKeys(weapons));
};

export const getWeaponsNeededMaterials = (weaponNames) => {
	usePlannedWeaponStore().init();
	let weapons = usePlannedWeaponStore().getWeapons(weaponNames);
	if (!weapons) return {};

	const combinedNeededMaterials = {};
	for (let weaponName in weapons) {
		const weaponMaterials = getWeaponNeededMaterials(weaponName);
		for (let materialType in weaponMaterials) {
			if (combinedNeededMaterials[materialType] === undefined) {
				combinedNeededMaterials[materialType] = weaponMaterials[materialType];
			} else {
				combinedNeededMaterials[materialType] += weaponMaterials[materialType];
			}
		}
	}

	return combinedNeededMaterials;
};
