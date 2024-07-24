import * as dbInventoryItem from '@/data/database/dbInventoryItem';
import { useStorage, useDebounceFn } from '@vueuse/core';
// not exported
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
		500,
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
		inventoryItems.value[stuffKey]['count'] = parseInt(value);

		return debouncedStoreToStorage();
	}

	function updateAll() {
		debouncedStoreToStorage();
	}

	return {
		inventoryItems,
		init,
		get,
		updateInventory,
		updateAll,
	};
});
