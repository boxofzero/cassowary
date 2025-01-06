import { useStorage } from '@vueuse/core';
import * as dbPlannedCharacter from '@/data/database/dbPlannedCharacter';
import * as gameCharacter from '@/data/game/gameCharacter';

const plannedCharactersRepo = () => {
	return useStorage('plannedCharacters', {});
};

export const usePlannedCharacterStore = defineStore('plannedCharacters', () => {
	const plannedCharacters = ref({});

	function init() {
		plannedCharacters.value = plannedCharactersRepo().value;
	}

	const storeToStorage = () => {
		console.log('storing plannedCharacters to localStorage');
		plannedCharactersRepo().value = plannedCharacters.value;
	};

	function getOrInitEntry(characterName) {
		if (
			Object.prototype.hasOwnProperty.call(
				plannedCharacters.value,
				characterName
			)
		) {
			return plannedCharacters.value[characterName];
		}
		return { ...dbPlannedCharacter.character };
	}

	function getCharacters(characterNames) {
		const characters = {};
		for (let characterName of characterNames) {
			characters[characterName] = getOrInitEntry(characterName);
		}
		return characters;
	}

	function upsert(characterName, character) {
		// if the name does not exist in the plannedCharacters key, init it
		if (
			!Object.prototype.hasOwnProperty.call(
				plannedCharacters.value,
				characterName
			)
		) {
			plannedCharacters.value[characterName] = {};
			plannedCharacters.value[characterName]['created_at'] =
				new Date().toISOString();
		}
		plannedCharacters.value[characterName]['updated_at'] =
			new Date().toISOString();

		plannedCharacters.value[characterName] = useAssign(
			plannedCharacters.value[characterName],
			useOmit(character, 'name')
		);

		storeToStorage();
	}

	function setDone(characterName) {
		const character = plannedCharacters.value[characterName];
		if (character === undefined) {
			return;
		}

		plannedCharacters.value = useOmit(plannedCharacters.value, characterName);
		storeToStorage();
	}

	function isCharacterDone(characterName) {
		const character = plannedCharacters.value[characterName];
		if (character === undefined) {
			return true;
		}

		// check active skills
		for (let activeSkill of dbPlannedCharacter.characterStructure[
			'active_skills'
		]) {
			if (activeSkill === 'char') {
				if (character[activeSkill + '_target_level'] !== undefined) {
					let target = useIndexOf(
						useMap(gameCharacter.charLevellingMaterialsCount, (value, key) => {
							return value.level;
						}),
						character[activeSkill + '_target_level']
					);
					let current = useIndexOf(
						useMap(gameCharacter.charLevellingMaterialsCount, (value, key) => {
							return value.level;
						}),
						character[activeSkill + '_current_level']
					);
					if (target > current) {
						return false;
					}
				}
				continue;
			}

			if (character[activeSkill + '_target_level'] !== undefined) {
				if (
					character[activeSkill + '_target_level'] >
					character[activeSkill + '_current_level']
				) {
					return false;
				}
			}
		}

		// check passive skills
		for (let passiveSkill of dbPlannedCharacter.characterStructure[
			'passive_skills'
		]) {
			if (character[passiveSkill] === true) {
				return false;
			}
		}
		return true;
	}

	function getAllActivePlannedCharacters() {
		let activeCharacters = { ...plannedCharacters.value };
		for (let character in activeCharacters) {
			if (isCharacterDone(character)) {
				// delete jumpscare. it's deleteing from newly created object
				delete activeCharacters[character];
			}
		}

		return activeCharacters;
	}

	function restoreData(data) {
		plannedCharacters.value = data;
		storeToStorage();
	}

	return {
		plannedCharacters,
		init,
		getOrInitEntry,
		getCharacters,
		upsert,
		setDone,
		isCharacterDone,
		getAllActivePlannedCharacters,
		restoreData,
	};
});
