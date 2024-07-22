import { usePlannedCharacterStore } from '@/stores/plannedCharacters';
import { useInventoryItemStore } from '@/stores/inventoryItems';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
	isTieredMaterialType,
} from '@/services/planner/utilities';
import * as gameCharacters from '~/data/game/gameCharacters';

/**
 * Retrieves the materials needed for a character based on their current level and target level.
 *
 * @param {string} characterName - The name of the character.
 * @return {Object} An object containing the materials needed for the character, with the material type as the key and the quantity as the value.
 */
export const getCharacterMaterialsNeeded = (characterName) => {
	// init plannedCharacters, inventoryItems
	usePlannedCharacterStore().init();
	useInventoryItemStore().init();

	// get plannedCharacter
	const plannedCharacter =
		usePlannedCharacterStore().plannedCharacters[characterName];
	if (!plannedCharacter) return {};
	// temporary assign name for business logic
	plannedCharacter['name'] = characterName;

	const currentLevel = plannedCharacter.char_current_level;
	const targetLevel = plannedCharacter.char_target_level;

	const levelsToFarm = {
		charLevel: getLevelRangeDiff(
			gameCharacters.charLevellingMaterialsCount,
			currentLevel,
			targetLevel
		),
	};

	const activeSkillsToFarm = getActiveSkillsToFarm(plannedCharacter);

	const passiveSkillsToFarm = getPassiveSkillsToFarm(plannedCharacter);

	// calculate all materials needed
	// at this level, the materials already flatten, not tiered
	const materialsNeeded = getMaterialsFromLevelListStatList(characterName, {
		...levelsToFarm,
		...activeSkillsToFarm,
		...passiveSkillsToFarm,
	});

	return materialsNeeded;
};

const getPassiveSkillsToFarm = (plannedCharacter) => {
	const passiveSkillsToFarm = {};
	const passiveSkills = gameCharacters.passiveSkills;
	for (let skill of passiveSkills) {
		if (plannedCharacter[skill] == 0) {
			passiveSkillsToFarm[skill] = [
				gameCharacters.passiveSkillLevellingMaterialsCount[skill],
			];
		}
	}
	return passiveSkillsToFarm;
};

const getActiveSkillsToFarm = (plannedCharacter) => {
	const activeSkills = {};
	const skills = gameCharacters.activeSkills;
	for (let skill of skills) {
		activeSkills[skill] = getLevelRangeDiff(
			gameCharacters.activeSkillLevellingMaterialsCount,
			plannedCharacter[skill + '_current_level'],
			plannedCharacter[skill + '_target_level']
		);
	}
	return activeSkills;
};

export const getAllCharactersMaterialsNeeded = () => {
	usePlannedCharacterStore().init();
	let characters = usePlannedCharacterStore().plannedCharacters;

	const combinedMaterialsNeeded = {};
	for (let characterName in characters) {
		const characterMaterials = getMaterialsNeeded(characterName);

		for (let materialType in characterMaterials) {
			// exp and credit: no material, just add
			if (['char_exp', 'credit'].includes(materialType)) {
				combinedMaterialsNeeded[materialType] =
					combinedMaterialsNeeded[materialType] || 0;
				combinedMaterialsNeeded[materialType] +=
					characterMaterials[materialType];
				continue;
			}

			// assign {} if undefined
			if (combinedMaterialsNeeded[materialType] === undefined) {
				combinedMaterialsNeeded[materialType] = {};
			}
			// inventory tiered materialTypes
			if (isTieredMaterialType(materialType)) {
				for (let tieredMaterial in characterMaterials[materialType]) {
					if (
						combinedMaterialsNeeded[materialType][tieredMaterial] === undefined
					) {
						combinedMaterialsNeeded[materialType][tieredMaterial] = {};
					}
					for (let tier in characterMaterials[materialType][tieredMaterial]) {
						combinedMaterialsNeeded[materialType][tieredMaterial][tier] =
							combinedMaterialsNeeded[materialType][tieredMaterial][tier] || 0;
						combinedMaterialsNeeded[materialType][tieredMaterial][tier] +=
							characterMaterials[materialType][tieredMaterial][tier];
					}
				}
				continue;
			}

			// inventory non-tiered materialTypes
			for (let material in characterMaterials[materialType]) {
				combinedMaterialsNeeded[materialType][material] =
					combinedMaterialsNeeded[materialType][material] || 0;
				combinedMaterialsNeeded[materialType][material] +=
					characterMaterials[materialType][material];
			}
		}
	}

	return combinedMaterialsNeeded;
};
