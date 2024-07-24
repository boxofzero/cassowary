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
			plannedCharactersRepo.value = plannedCharacters.value;
		},
		500,
		{ maxWait: 5000 }
	);

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

		return debouncedStoreToStorage();
	}

	return {
		plannedCharacters,
		init,
		getOrInitEntry,
		upsert,
	};
});
