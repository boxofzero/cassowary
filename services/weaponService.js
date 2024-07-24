import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
	isTieredMaterialType,
} from '@/services/planner/utilities';
import * as gameWeapons from '@/data/game/gameWeapons';
import * as dbInventoryItem from '@/data/database/dbInventoryItem';

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

	const levelsToFarm = {
		weapLevel: getLevelRangeDiff(
			gameWeapons.weaponLevellingMaterialsCount,
			currentLevel,
			targetLevel
		),
	};

	const activeSkillsToFarm = getActiveSkillsToFarm(plannedWeapon);

	const passiveSkillsToFarm = getPassiveSkillsToFarm(plannedWeapon);

	// calculate all materials needed
	// at this level, the materials already flatten, not tiered
	const materialsNeeded = getMaterialsFromLevelListStatList(weaponName, {
		...levelsToFarm,
		...activeSkillsToFarm,
		...passiveSkillsToFarm,
	});

	return materialsNeeded;
};

const getPassiveSkillsToFarm = (plannedWeapon) => {
	const passiveSkillsToFarm = {};
	const passiveSkills = gameWeapons.passiveSkills;
	for (let skill of passiveSkills) {
		if (plannedWeapon[skill] == 0) {
			passiveSkillsToFarm[skill] = [
				gameWeapons.passiveSkillLevellingMaterialsCount[skill],
			];
		}
	}
	return passiveSkillsToFarm;
};

const getActiveSkillsToFarm = (plannedWeapon) => {
	const activeSkills = {};
	const skills = gameWeapons.activeSkills;
	for (let skill of skills) {
		activeSkills[skill] = getLevelRangeDiff(
			gameWeapons.activeSkillLevellingMaterialsCount,
			plannedWeapon[skill + '_current_level'],
			plannedWeapon[skill + '_target_level']
		);
	}
	return activeSkills;
};

export const getAllWeaponsNeededMaterials = () => {
	usePlannedWeaponStore().init();
	let weapons = usePlannedWeaponStore().plannedWeapons;
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
