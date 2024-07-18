import { usePlannedCharacterStore } from '@/stores/plannedCharacters';
import {
	getLevelRangeDiff,
	getMaterialsFromLevelListStatList,
} from '@/services/planner/utilities';
import {
	charLevellingMaterialsCount,
	activeSkillLevellingMaterialsCount,
	passiveSkillLevellingMaterialsCount,
} from '@/gameData/charactersStatMaterial';
import * as charactersNewFormData from '@/forms/characters/new/charactersNewFormData';

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
			charLevellingMaterialsCount,
			currentLevel,
			targetLevel
		),
	};
	const activeSkillsToFarm = getActiveSkillsToFarm(plannedCharacter);
	// console.log('activeSkillsToFarm: ' + JSON.stringify(activeSkillsToFarm));
	const passiveSkillsToFarm = getPassiveSkillsToFarm(plannedCharacter);
	// console.log('passiveSkillsToFarm: ' + JSON.stringify(passiveSkillsToFarm));

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
	const tier_1 = useMap(
		charactersNewFormData.passiveSkills.tier_1,
		'model_value'
	);
	const tier_2 = useMap(
		charactersNewFormData.passiveSkills.tier_2,
		'model_value'
	);
	const skills = [tier_1, tier_2].flat();
	for (let skill of skills) {
		// console.log('skill: ' + JSON.stringify(skill));
		// console.log(
		// 	'plannedCharacter[skill]: ' + JSON.stringify(plannedCharacter[skill])
		// );
		if (plannedCharacter[skill] == 0) {
			passiveSkills[skill] = [passiveSkillLevellingMaterialsCount[skill]];
		}
	}
	return passiveSkills;
};

const getActiveSkillsToFarm = (plannedCharacter) => {
	const activeSkills = {};
	const skills = useMap(charactersNewFormData.activeSkills, 'model_value');
	for (let skill of skills) {
		activeSkills[skill] = getLevelRangeDiff(
			activeSkillLevellingMaterialsCount,
			plannedCharacter[skill + '_current_level'],
			plannedCharacter[skill + '_target_level']
		);
	}
	return activeSkills;
};
