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
	console.log('expDataSortedDesc: ' + JSON.stringify(expDataSortedDesc));
	for (let expData of expDataSortedDesc) {
		const expDataNeeded = Math.floor(expNeededCounting / expData[1].exp_value);
		expLeftover = expNeededCounting % expData[1].exp_value;
		data[expData[0]] = {
			owned: ownedMaterials[expData[0]].count || 0,
			needed: expDataNeeded || 0,
			icon: gameInventoryItem.allInventoryItems[expData[0]].icon,
			label: gameInventoryItem.allInventoryItems[expData[0]].label,
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

		responseData[materialType] = {
			owned:
				(ownedMaterials[materialType] && ownedMaterials[materialType].count) ||
				0,
			needed: neededMaterials[materialType] || 0,
			icon: gameInventoryItem.allInventoryItems[materialType].icon,
			label: gameInventoryItem.allInventoryItems[materialType].label,
		};
	}

	console.log('responseData before sort: ' + JSON.stringify(responseData));

	// 'sorting' the materials
	let allInventoryItems = dbInventoryItem.dbInventoryItems;
	let responseDataSorted = {};
	let synthesizedList = {};
	for (let materialType in allInventoryItems) {
		if (responseData[materialType] === undefined) {
			continue;
		}
		responseDataSorted[materialType] = responseData[materialType];

		// if the material is synthesizable
		// since this is sorted data,
		if (
			useKeys(gameInventoryItem.synthesizable_materials).includes(materialType)
		) {
			const synthesizableData =
				gameInventoryItem.synthesizable_materials[materialType];
			// if it has from
			if (synthesizableData.to !== undefined) {
				// check if there's a synthesizable material
				const syntesizedMaterial = synthesizedList[materialType] || 0;
				// count the synthesizable materials
				synthesizedList[synthesizableData.to] = Math.floor(
					(syntesizedMaterial +
						responseData[materialType].owned -
						responseData[materialType].needed) /
						synthesizableData.cost
				);
				if (synthesizedList[synthesizableData.to] < 0) {
					synthesizedList[synthesizableData.to] = 0;
				}
				console.log('materialType: ' + materialType);
				console.log('synthesizableData.to: ' + synthesizableData.to);
				console.log(
					'synthesizedList[synthesizableData.to]: ' +
						synthesizedList[synthesizableData.to]
				);
			}
			responseDataSorted[materialType]['synthesized'] =
				synthesizedList[materialType];
			if (
				responseDataSorted[materialType]['synthesized'] >
				responseDataSorted[materialType]['needed']
			) {
				responseDataSorted[materialType]['synthesized'] =
					responseDataSorted[materialType]['needed'];
			}
		}
	}

	console.log('responseDataSorted: ' + JSON.stringify(responseDataSorted));
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

	console.log('responseData', JSON.stringify(responseData));
	return responseData;
};
