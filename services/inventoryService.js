import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';
import * as characterService from '@/services/characterService';
import * as weaponService from '@/services/weaponService';
import * as dbInventoryItem from '@/data/database/dbInventoryItem';

const generateExpData = (
	expNeeded,
	ownedMaterials,
	expMaterialTypeStructure
) => {
	const data = {};
	let expNeededCounting = expNeeded;
	let expLeftover = 0;
	const expDataSortedDesc = useSortBy(
		useToPairs(expMaterialTypeStructure),
		(v) => -v[1].exp_value
	);
	for (let expData of expDataSortedDesc) {
		const expDataNeeded = Math.floor(expNeededCounting / expData[1].exp_value);
		expLeftover = expNeededCounting % expData[1].exp_value;
		data[expData[0]] = {
			owned: ownedMaterials[expData[0]].count || 0,
			needed: expDataNeeded || 0,
			icon: expData[1].icon,
			label: expData[1].label,
		};
		expNeededCounting = expLeftover;
	}

	return data;
};

export const getOwnedNeededMaterialsResponseData = (neededMaterials) => {
	let responseData = {};
	useInventoryItemStore().init();
	const ownedMaterials = useInventoryItemStore().inventoryItems;
	if (ownedMaterials.length == 0) {
		return {};
	}

	for (let materialType in neededMaterials) {
		if (['weap_exp', 'char_exp'].includes(materialType)) {
			const exp = generateExpData(
				neededMaterials[materialType],
				ownedMaterials,
				gameInventoryItem.exp_data[materialType]
			);
			responseData = useAssign(responseData, exp);
			continue;
		}
		console.log('materialType: ' + materialType);
		responseData[materialType] = {
			owned:
				(ownedMaterials[materialType] && ownedMaterials[materialType].count) ||
				0,
			needed: neededMaterials[materialType] || 0,
			icon: gameInventoryItem.allInventoryItems[materialType].icon,
			label: gameInventoryItem.allInventoryItems[materialType].label,
		};
	}

	// 'sorting' the materials
	let allInventoryItems = dbInventoryItem.dbInventoryItems;
	let responseDataSorted = {};
	for (let materialType in allInventoryItems) {
		if (responseData[materialType] === undefined) {
			continue;
		}
		responseDataSorted[materialType] = responseData[materialType];
	}

	return responseDataSorted;
};

export const getAllMaterialsResponseData = () => {
	// this doesnt include unneeded material
	const characterMaterials = characterService.getAllCharactersNeededMaterials();
	const weaponMaterials = weaponService.getAllWeaponsNeededMaterials();
	const ownedNeededMaterialsData = getOwnedNeededMaterialsResponseData({
		...weaponMaterials,
		...characterMaterials,
	});

	useInventoryItemStore().init();
	const ownedMaterials = useInventoryItemStore().inventoryItems;
	if (ownedMaterials.length == 0) {
		return {};
	}

	// include the not needed materials
	let allInventoryItems = dbInventoryItem.dbInventoryItems;
	let responseData = {};
	for (let materialType in allInventoryItems) {
		// needed materials, data already structured
		if (ownedNeededMaterialsData[materialType]) {
			responseData[materialType] = ownedNeededMaterialsData[materialType];
			continue;
		}

		// the rest not needed materials
		responseData[materialType] = {
			owned:
				(ownedMaterials[materialType] && ownedMaterials[materialType].count) ||
				0,
			needed: 0,
			icon: gameInventoryItem.allInventoryItems[materialType].icon,
			label: gameInventoryItem.allInventoryItems[materialType].label,
		};
	}
	return responseData;
};
