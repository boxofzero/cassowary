import { useStorage } from '@vueuse/core';

import * as inventoryStructures from '~/libraries/inventoryStructures';

export const useInventoryRepo = () => {
	const getDefaultInventoryRepo = () => {
		return inventoryStructures.allInventories;
	};

	// this is localstorage adapter object
	const inventoryRepo = () => {
		return useStorage('allInventories', getDefaultInventoryRepo());
	};

	return {
		getDefaultInventoryRepo,
		inventoryRepo,
	};
};
