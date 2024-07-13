import { plannedCharacters } from '~/libraries/plannedCharacters';
import { useStorage, useDebounceFn } from '@vueuse/core';

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
			plannedCharactersRepo.value = plannedCharacters.value;
		},
		500,
		{ maxWait: 5000 }
	);

	function upsertPlannedCharacter(characterName, key, value) {
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
		plannedCharacters.value[characterName][key] = value;
		plannedCharacters.value[characterName]['updated_at'] =
			new Date().toISOString();

		debouncedStoreToStorage();
	}

	return {
		plannedCharacters,
		init,
		upsertPlannedCharacter,
	};
});
