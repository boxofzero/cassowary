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

	const debouncedStoreToStorage = useDebounceFn(
		() => {
			console.log('storing plannedCharacters to localStorage');
			plannedCharactersRepo().value = plannedCharacters.value;
		},
		500,
		{ maxWait: 5000 }
	);

	function getOrInitEntry(characterName) {
		console.log(
			'plannedCharacters.value: ' + JSON.stringify(plannedCharacters.value)
		);
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

		console.log('storing plannedCharacters to localStorage');
		plannedCharactersRepo().value = plannedCharacters.value;
	}

	function setDone(characterName) {
		const character = plannedCharacters.value[characterName];
		if (character === undefined) {
			return;
		}
		const structure = dbPlannedCharacter.characterStructure;
		for (let skill of structure.active_skills) {
			if (character[skill + '_target_level'] !== undefined) {
				character[skill + '_current_level'] =
					character[skill + '_target_level'];
			}
		}
		for (let skill of structure.passive_skills) {
			if (character[skill] === 0) {
				character[skill] = 1;
			}
		}

		upsert(characterName, character);
	}

	return {
		plannedCharacters,
		init,
		getOrInitEntry,
		upsert,
		setDone,
	};
});
