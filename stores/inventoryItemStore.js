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

	const debouncedStoreToStorage = useDebounceFn(
		() => {
			console.log('storing inventoryItems to localStorage');
			inventoryRepo.value = inventoryItems.value;
		},
		200,
		{ maxWait: 5000 }
	);

	function get(stuffKey) {
		if (!Object.prototype.hasOwnProperty.call(inventoryItems.value, stuffKey)) {
			inventoryItems.value[stuffKey] = {
				count: 0,
			};
		}
		return inventoryItems.value[stuffKey];
	}

	function updateInventory(stuffKey, value) {
		const getInventoryItemMaterial = get(stuffKey);
		getInventoryItemMaterial['count'] = parseInt(value);

		console.log('updateInventory ' + stuffKey + ' -> ' + value);
		console.log(
			'before update: ' +
				JSON.stringify(inventoryItems.value[stuffKey].count || 0)
		);

		console.log('storing inventoryItems to localStorage');
		inventoryRepo.value = inventoryItems.value;
		console.log(
			'after update: ' +
				JSON.stringify(inventoryItems.value[stuffKey].count || 0)
		);
	}

	function updateAll() {
		console.log('storing inventoryItems to localStorage');
		inventoryRepo.value = inventoryItems.value;
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
					synthesizedCost * updatedValue * -1
				);
			}
		}
	}

	return {
		inventoryItems,
		init,
		get,
		updateInventory,
		updateAll,
		decreaseTieredMaterial,
	};
});
