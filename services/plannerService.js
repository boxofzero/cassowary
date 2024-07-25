import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as gameInventoryItem from '@/data/game/inventoryItem/gameInventoryItem';

export const setCharacterDone = (character, loadedMaterials) => {
	// character must have name
	// set character done
	usePlannedCharacterStore().init();
	useInventoryItemStore().init();
	usePlannedCharacterStore().setDone(character.name);
	console.log('character setDone done');
	setInventoryItemDone(loadedMaterials);
	console.log('setInventoryItemDone done');
};

const setInventoryItemDone = (loadedMaterials) => {
	useForEach(loadedMaterials, function (materialData, material) {
		if (useKeys(gameInventoryItem.synthesizable_materials).includes(material)) {
			useInventoryItemStore().decreaseTieredMaterial(
				material,
				materialData.needed
			);
		} else {
			let updatedValue = materialData.owned - materialData.needed;
			if (updatedValue < 0) {
				updatedValue = 0;
			}
			useInventoryItemStore().updateInventory(material, updatedValue);
		}
	});
};
