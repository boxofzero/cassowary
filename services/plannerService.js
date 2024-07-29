import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as gameInventoryItem from '@/data/game/inventoryItem/gameInventoryItem';
import moment from 'moment';

export const setWeaponDone = (weapon, loadedMaterials) => {
	// weapon must have name
	// set weapon done
	usePlannedWeaponStore().init();
	useInventoryItemStore().init();
	usePlannedWeaponStore().setDone(weapon.name);
	setInventoryItemDone(loadedMaterials);
};

export const setCharacterDone = (character, loadedMaterials) => {
	// character must have name
	// set character done
	usePlannedCharacterStore().init();
	useInventoryItemStore().init();
	usePlannedCharacterStore().setDone(character.name);
	setInventoryItemDone(loadedMaterials);
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

export const downloadData = () => {
	usePlannedCharacterStore().init();
	useInventoryItemStore().init();
	usePlannedWeaponStore().init();

	// set data
	let data = {};
	data['plannedCharacters'] = usePlannedCharacterStore().plannedCharacters;
	data['plannedWeapons'] = usePlannedWeaponStore().plannedWeapons;
	data['inventoryItems'] = useInventoryItemStore().inventoryItems;

	// download data
	// credit: https://www.bitdegree.org/learn/javascript-download
	let text = JSON.stringify(data);
	let timestamp = moment(new Date()).format('YYMMDD_HHmmss');
	let filename = 'cassowary_planner_data_' + timestamp + '.json';
	let element = document.createElement('a');
	element.setAttribute(
		'href',
		'data:application/json;charset=utf-8,' + encodeURIComponent(text)
	);
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);
};
