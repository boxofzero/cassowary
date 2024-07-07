import { useInventoryRepo } from '~/composables/useInventoryRepo';
import * as inventoryStructures from '~/libraries/inventory-structures';

const { inventoryRepo } = useInventoryRepo();

export const useInventoryStore = defineStore('inventories', () => {
	const allInventories = ref(inventoryStructures.allInventories);

	function initAllInventories() {
		this.allInventories = inventoryRepo().value;
		console.log(
			'allInventories:',
			this.allInventories['resonator_ascension_boss_material'][
				'mysterious_code'
			]['count']
		);
	}

	function updateInventory(inventoryType, stuff, value) {
		if (!process.client) return;
		console.log('updateInventory log inventoryType: ', inventoryType);
		console.log('updateInventory log stuff: ', stuff);
		console.log('updateInventory log value: ', value);

		this.allInventories[inventoryType][stuff]['count'] = parseInt(value);
		inventoryRepo().value = this.allInventories;
	}

	return {
		allInventories,
		initAllInventories,
		updateInventory,
	};
});
