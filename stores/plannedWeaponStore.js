import { useStorage } from '@vueuse/core';
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';
import * as gameWeapon from '@/data/game/gameWeapon';

const plannedWeaponsRepo = () => {
	return useStorage('plannedWeapons', {});
};

export const usePlannedWeaponStore = defineStore('plannedWeapons', () => {
	const plannedWeapons = ref({});

	function init() {
		plannedWeapons.value = plannedWeaponsRepo().value;
	}

	const storeToStorage = () => {
		console.log('storing plannedWeapons to localStorage');
		plannedWeaponsRepo().value = plannedWeapons.value;
	};

	function getOrInitEntry(weaponName) {
		if (
			Object.prototype.hasOwnProperty.call(plannedWeapons.value, weaponName)
		) {
			return plannedWeapons.value[weaponName];
		}
		return { ...dbPlannedWeapon.weapon };
	}

	function getWeapons(weaponNames) {
		const weapons = {};
		for (let weaponName of weaponNames) {
			weapons[weaponName] = getOrInitEntry(weaponName);
		}
		return weapons;
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

		storeToStorage();
	}

	function setDone(weaponName) {
		const weapon = plannedWeapons.value[weaponName];
		if (weapon === undefined) {
			return;
		}

		// if set done, then remove from planned weapons
		plannedWeapons.value = useOmit(plannedWeapons.value, weaponName);
		storeToStorage();
	}

	function isWeaponDone(weaponName) {
		const weapon = plannedWeapons.value[weaponName];
		if (weapon === undefined) {
			return true;
		}

		if (weapon['weap_target_level'] !== undefined) {
			let target = useIndexOf(
				useMap(gameWeapon.weaponLevellingMaterialsCount[5], (value, key) => {
					return value.level;
				}),
				weapon['weap_target_level']
			);
			let current = useIndexOf(
				useMap(gameWeapon.weaponLevellingMaterialsCount[5], (value, key) => {
					return value.level;
				}),
				weapon['weap_current_level']
			);
			if (target > current) {
				return false;
			}
		}

		return true;
	}

	function getAllActivePlannedWeapons() {
		let activeWeapons = { ...plannedWeapons.value };
		for (let weapon in activeWeapons) {
			if (isWeaponDone(weapon)) {
				// delete jumpscare. it's deleteing from newly created object
				delete activeWeapons[weapon];
			}
		}

		return activeWeapons;
	}

	function restoreData(data) {
		plannedWeapons.value = data;
		storeToStorage();
	}

	return {
		plannedWeapons,
		init,
		getOrInitEntry,
		getWeapons,
		upsert,
		setDone,
		isWeaponDone,
		getAllActivePlannedWeapons,
		restoreData,
	};
});
