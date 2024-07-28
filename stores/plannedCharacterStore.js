import { useStorage, useDebounceFn } from '@vueuse/core';
import * as dbPlannedCharacter from '@/data/database/dbPlannedCharacter';

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

		plannedCharacters.value[characterName] = undefined;
		storeToStorage();
	}

	return {
		plannedCharacters,
		init,
		getOrInitEntry,
		getCharacters,
		upsert,
		setDone,
	};
});
