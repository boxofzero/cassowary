import { useStorage, useDebounceFn } from '@vueuse/core';
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';

const plannedWeaponsRepo = () => {
	return useStorage('plannedWeapons', {});
};

export const usePlannedWeaponStore = defineStore('plannedWeapons', () => {
	const plannedWeapons = ref({});

	function init() {
		plannedWeapons.value = plannedWeaponsRepo().value;
	}

	const debouncedStoreToStorage = useDebounceFn(
		() => {
			console.log('storing plannedWeapons to localStorage');
			plannedWeaponsRepo.value = plannedWeapons.value;
		},
		500,
		{ maxWait: 5000 }
	);

	function getOrInitEntry(characterName) {
		if (
			Object.prototype.hasOwnProperty.call(plannedWeapons.value, characterName)
		) {
			return plannedWeapons.value[characterName];
		}
		return { ...dbPlannedWeapon.character };
	}

	function upsert(characterName, character) {
		// if the name does not exist in the plannedWeapons key, init it
		if (
			!Object.prototype.hasOwnProperty.call(plannedWeapons.value, characterName)
		) {
			plannedWeapons.value[characterName] = {};
			plannedWeapons.value[characterName]['created_at'] =
				new Date().toISOString();
		}
		plannedWeapons.value[characterName]['updated_at'] =
			new Date().toISOString();

		plannedWeapons.value[characterName] = useAssign(
			plannedWeapons.value[characterName],
			useOmit(character, 'name')
		);

		return debouncedStoreToStorage();
	}

	return {
		plannedWeapons,
		init,
		getOrInitEntry,
		upsert,
	};
});
