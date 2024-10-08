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

		if (
			useKeys(gameInventoryItem.synthesizable_materials).includes(materialType)
		) {
			let iterateMaterialType = materialType;
			while (iterateMaterialType !== undefined) {
				if (neededMaterials[iterateMaterialType] === undefined) {
					responseData[iterateMaterialType] = {
						owned:
							(ownedMaterials[iterateMaterialType] &&
								ownedMaterials[iterateMaterialType].count) ||
							0,
						needed: neededMaterials[iterateMaterialType] || 0,
						icon: gameInventoryItem.allInventoryItems[iterateMaterialType].icon,
						label:
							gameInventoryItem.allInventoryItems[iterateMaterialType].label,
					};
				}
				iterateMaterialType =
					gameInventoryItem.synthesizable_materials[iterateMaterialType].from;
			}
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
			let diff =
				responseData[materialType].owned - responseData[materialType].needed;
			const synthesizableData =
				gameInventoryItem.synthesizable_materials[materialType];
			// if it has from
			if (synthesizableData.to !== undefined) {
				// check if there's a synthesizable material
				const syntesizedMaterial = synthesizedList[materialType] || 0;
				// count the synthesizable materials
				synthesizedList[synthesizableData.to] = Math.floor(
					(syntesizedMaterial + diff) / synthesizableData.cost
				);
				if (synthesizedList[synthesizableData.to] < 0) {
					synthesizedList[synthesizableData.to] = 0;
				}
			}

			// calculation should be fine above. now about displaying syntesized material
			responseDataSorted[materialType]['synthesized'] =
				synthesizedList[materialType];

			// recalibrate synthesized value
			if (synthesizableData.to === undefined) {
				let recheckedMaterial = materialType;
				while (recheckedMaterial !== undefined) {
					// iterator
					let upperTierRecheckedMaterial =
						gameInventoryItem.synthesizable_materials[recheckedMaterial].to;
					let lowerTierRecheckedMaterial =
						gameInventoryItem.synthesizable_materials[recheckedMaterial].from;

					if (lowerTierRecheckedMaterial === undefined) {
						break;
					}

					if (
						responseDataSorted[recheckedMaterial].owned >=
						responseDataSorted[recheckedMaterial].needed
					) {
						recheckedMaterial = lowerTierRecheckedMaterial;
						continue;
					}

					if (
						responseDataSorted[recheckedMaterial]['synthesized'] +
							responseDataSorted[recheckedMaterial].owned <
						responseDataSorted[recheckedMaterial].needed
					) {
						recheckedMaterial = lowerTierRecheckedMaterial;
						continue;
					}

					if (upperTierRecheckedMaterial === undefined) {
						responseDataSorted[recheckedMaterial]['synthesized'] = Math.min(
							responseDataSorted[recheckedMaterial]['synthesized'],
							responseDataSorted[recheckedMaterial].needed -
								responseDataSorted[recheckedMaterial].owned
						);
					}

					responseDataSorted[lowerTierRecheckedMaterial]['synthesized'] =
						gameInventoryItem.synthesizable_materials[
							lowerTierRecheckedMaterial
						].cost *
							responseDataSorted[recheckedMaterial]['synthesized'] +
						responseDataSorted[lowerTierRecheckedMaterial].needed -
						responseDataSorted[lowerTierRecheckedMaterial].owned;

					recheckedMaterial = lowerTierRecheckedMaterial;
				}
			}
		}

		// key for v-model
		responseDataSorted[materialType]['key'] =
			materialType +
			'_' +
			(responseDataSorted[materialType]['owned'] || 0) +
			'_' +
			(responseDataSorted[materialType]['needed'] || 0);
	}

	return responseDataSorted;
};

export const getAllMaterialsResponseData = () => {
	// this doesnt include unneeded material
	const characterMaterials = characterService.getAllCharactersNeededMaterials();
	const weaponMaterials = weaponService.getAllWeaponsNeededMaterials();
	const combinedMaterials = useMergeWith(
		weaponMaterials,
		characterMaterials,
		(objValue, srcValue) => {
			return (objValue || 0) + (srcValue || 0);
		}
	);

	const ownedNeededMaterialsData =
		getOwnedNeededMaterialsResponseData(combinedMaterials);

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
