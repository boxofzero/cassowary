import * as inventoryStructures from '~/libraries/inventoryStructures';
import { useStorage, useDebounceFn } from '@vueuse/core';
// not exported
const inventoryRepo = () => {
	return useStorage('inventoryItems', inventoryStructures.inventoryItems);
};

export const useInventoryItemStore = defineStore('inventoryItems', () => {
	const inventoryItems = ref(inventoryStructures.inventoryItems);

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

	function updateInventory(itemType, stuffKey, value) {
		console.log('updateInventory: ', itemType, stuffKey, value);
		inventoryItems.value[itemType][stuffKey]['count'] = parseInt(value);

		debouncedStoreToStorage();
	}

	return {
		inventoryItems,
		init,
		updateInventory,
	};
});
