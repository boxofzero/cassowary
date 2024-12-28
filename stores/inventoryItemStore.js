import * as dbInventoryItem from '@/data/database/dbInventoryItem';
import { useStorage, useDebounceFn } from '@vueuse/core';
import * as gameInventoryItem from '@/data/game/inventoryItem/gameInventoryItem';

const inventoryRepo = () => {
	return useStorage('inventoryItems', dbInventoryItem.dbInventoryItems);
};

export const useInventoryItemStore = defineStore('inventoryItems', () => {
	const inventoryItems = ref(dbInventoryItem.dbInventoryItems);

	function init() {
		inventoryItems.value = inventoryRepo().value;
	}

	function get(stuffKey) {
		if (!Object.prototype.hasOwnProperty.call(inventoryItems.value, stuffKey)) {
			inventoryItems.value[stuffKey] = {
				count: 0,
			};
		}
		return inventoryItems.value[stuffKey];
	}

	function updateInventory(stuffKey, value) {
		console.log('updateInventory ' + stuffKey + ' -> ' + value);
		console.log(
			'before update: ' +
				JSON.stringify(inventoryItems.value[stuffKey].count || 0)
		);

		const getInventoryItemMaterial = get(stuffKey);
		getInventoryItemMaterial['count'] = parseInt(value);

		storeToStorage();
		console.log(
			'after update: ' +
				JSON.stringify(inventoryItems.value[stuffKey].count || 0)
		);
	}

	function storeToStorage() {
		console.log('storing inventoryItems to localStorage');
		inventoryRepo().value = inventoryItems.value;
	}

	function decreaseTieredMaterial(material, value) {
		if (
			!useKeys(gameInventoryItem.synthesizable_materials).includes(material)
		) {
			return;
		}
		let updatedValue = get(material).count - value;
		if (updatedValue < 0) {
			// set to 0
			updateInventory(material, 0);
			// rest of material
			if (
				gameInventoryItem.synthesizable_materials[material].from !== undefined
			) {
				let lowerTierMaterial =
					gameInventoryItem.synthesizable_materials[material].from;
				let synthesizedCost =
					gameInventoryItem.synthesizable_materials[lowerTierMaterial].cost;
				return decreaseTieredMaterial(
					lowerTierMaterial,
					Math.floor(synthesizedCost * updatedValue * -1)
				);
			}
		} else {
			updateInventory(material, updatedValue);
		}
	}

	function restoreData(data) {
		inventoryItems.value = data;
		storeToStorage();
	}

	return {
		inventoryItems,
		init,
		get,
		updateInventory,
		decreaseTieredMaterial,
		restoreData,
	};
});
