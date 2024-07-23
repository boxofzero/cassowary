import { useInventoryItemStore } from '@/stores/inventoryItems';
import * as gameInventoryItems from '~/data/game/gameInventoryItems';
import * as characterService from '@/services/characterService';

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
		if (materialType == 'char_exp') {
			const charExp = generateExpData(
				neededMaterials[materialType],
				ownedMaterials,
				gameInventoryItems.categorizedInventoryItems.resonator_exp_material
			);
			responseData = useAssign(responseData, charExp);
			continue;
		}
		responseData[materialType] = {
			owned: ownedMaterials[materialType].count || 0,
			needed: neededMaterials[materialType] || 0,
			icon: gameInventoryItems.allInventoryItems[materialType].icon,
		};
	}

	return responseData;
};

export const getAllMaterialsResponseData = () => {
	const allMaterials = characterService.getAllCharactersNeededMaterials();
	const data = getOwnedNeededMaterialsResponseData(allMaterials);
	return data;
};
