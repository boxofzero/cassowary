import * as inventoryStructures from '~/libraries/inventoryStructures';
import { useStorage } from '@vueuse/core';

// not exported
const inventoryRepo = () => {
	return useStorage('inventoryItems', inventoryStructures.inventoryItems);
};

export const useInventoryItemStore = defineStore('inventoryItems', () => {
	const inventoryItems = ref(inventoryStructures.inventoryItems);

	function init() {
		inventoryItems.value = inventoryRepo().value;
	}

	function updateInventory(inventoryType, stuff, value) {
		inventoryItems.value[inventoryType][stuff]['count'] = parseInt(value);
		inventoryRepo.value = inventoryItems;
	}

	return {
		inventoryItems,
		init,
		updateInventory,
	};
});
