import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
} from '@/services/planner/utilities';
import * as gameCharacters from '@/data/game/gameCharacter';
import * as dbInventoryItem from '@/data/database/dbInventoryItem';

/**
 * Retrieves the materials needed for a character based on their current level and target level.
 *
 * @param {string} characterName - The name of the character.
 * @return {Object} An object containing the materials needed for the character, with the material type as the key and the quantity as the value.
 */
export const getCharacterNeededMaterials = (characterName) => {
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
		if (plannedCharacter[skill] === true) {
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

export const getAllCharactersNeededMaterials = () => {
	usePlannedCharacterStore().init();
	let characters = usePlannedCharacterStore().plannedCharacters;
	if (!characters) return {};
	return getCharactersNeededMaterials(useKeys(characters));
};

export const getCharactersNeededMaterials = (characterNames) => {
	usePlannedCharacterStore().init();
	let characters = usePlannedCharacterStore().getCharacters(characterNames);
	if (!characters) return {};

	const combinedNeededMaterials = {};
	for (let characterName in characters) {
		const characterMaterials = getCharacterNeededMaterials(characterName);
		for (let materialType in characterMaterials) {
			if (combinedNeededMaterials[materialType] === undefined) {
				combinedNeededMaterials[materialType] =
					characterMaterials[materialType];
			} else {
				combinedNeededMaterials[materialType] +=
					characterMaterials[materialType];
			}
		}
	}

	return combinedNeededMaterials;
};
