import { usePlannedCharacterStore } from '@/stores/plannedCharacters';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
} from '@/services/planner/utilities';
import * as gameCharacters from '~/data/game/gameCharacters';
import { isTieredMaterialType } from '@/services/planner/utilities';

export const getAllCharactersMaterialsNeeded = () => {
	usePlannedCharacterStore().init();
	let characters = usePlannedCharacterStore().plannedCharacters;
	const combinedMaterialsNeeded = {};
	for (let characterName in characters) {
		const characterMaterials = getMaterialsNeeded(characterName);

		for (let materialType in characterMaterials) {
			// exp and credit: no material, just add
			if (['exp', 'credit'].includes(materialType)) {
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

/**
 * Retrieves the materials needed for a character based on their current level and target level.
 * example return
 *  {"exp":7000,"credit":172000,
 * "enemy_drop_weapon_skill_material":
 * {"whisperin_core":{"1":4,"2":12,"3":12,"4":4}},
 * "boss_ascension_material":{"group_abomination_tacet_core":46},
 * "overworld_resource_ascension_material":{"coriolus":60}}
 *
 * @param {string} characterName - The name of the character.
 * @return {Object} An object containing the materials needed for the character, with the material type as the key and the quantity as the value.
 */
export const getMaterialsNeeded = (characterName) => {
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
	const materialsNeeded = getMaterialsFromLevelListStatList(characterName, {
		...levelsToFarm,
		...activeSkillsToFarm,
		...passiveSkillsToFarm,
	});

	return materialsNeeded;
};

const getPassiveSkillsToFarm = (plannedCharacter) => {
	const passiveSkills = {};
	const tier_1 = gameCharacters.passiveSkills.tier_1;
	const tier_2 = gameCharacters.passiveSkills.tier_2;
	const skills = [tier_1, tier_2].flat();
	for (let skill of skills) {
		if (plannedCharacter[skill] == 0) {
			passiveSkills[skill] = [
				gameCharacters.passiveSkillLevellingMaterialsCount[skill],
			];
		}
	}
	return passiveSkills;
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
