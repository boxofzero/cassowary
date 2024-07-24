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

	function getOrInitEntry(weaponName) {
		if (
			Object.prototype.hasOwnProperty.call(plannedWeapons.value, weaponName)
		) {
			return plannedWeapons.value[weaponName];
		}
		return { ...dbPlannedWeapon.weapon };
	}

	function upsert(weaponName, weapon) {
		// if the name does not exist in the plannedWeapons key, init it
		if (
			!Object.prototype.hasOwnProperty.call(plannedWeapons.value, weaponName)
		) {
			plannedWeapons.value[weaponName] = {};
			plannedWeapons.value[weaponName]['created_at'] = new Date().toISOString();
		}
		plannedWeapons.value[weaponName]['updated_at'] = new Date().toISOString();

		plannedWeapons.value[weaponName] = useAssign(
			plannedWeapons.value[weaponName],
			useOmit(weapon, 'name')
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
