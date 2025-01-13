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
		let owned = ownedMaterials[expData[0]].count || 0;
		let needed = expDataNeeded || 0;
		let missing = Math.max(needed - owned, 0);
		data[expData[0]] = {
			owned: owned,
			needed: needed,
			missing: missing,
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

		// loop for initializating lower tier synthesizable materials for the needed upper tier materials
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
						missing: 0,
						icon: gameInventoryItem.allInventoryItems[iterateMaterialType].icon,
						label:
							gameInventoryItem.allInventoryItems[iterateMaterialType].label,
					};
				}
				iterateMaterialType =
					gameInventoryItem.synthesizable_materials[iterateMaterialType].from;
			}
		}

		let owned =
			(ownedMaterials[materialType] && ownedMaterials[materialType].count) || 0;
		let needed = neededMaterials[materialType] || 0;
		let missing = Math.max(needed - owned, 0);
		responseData[materialType] = {
			owned: owned,

			needed: needed,
			missing: missing,
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

		// key for v-model
		responseDataSorted[materialType]['key'] =
			materialType +
			'_' +
			(responseDataSorted[materialType]['owned'] || 0) +
			'_' +
			(responseDataSorted[materialType]['needed'] || 0);

		// early exit for non-synthesizable materials
		if (
			!useKeys(gameInventoryItem.synthesizable_materials).includes(materialType)
		) {
			continue;
		}

		// if the material is synthesizable
		// calculate how many possible materials to synthesize
		// since this is sorted data, this can do directly
		let diff =
			responseData[materialType].owned - responseData[materialType].needed;
		const synthesizableData =
			gameInventoryItem.synthesizable_materials[materialType];
		// if it has upper material
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
		responseDataSorted[materialType].synthesized =
			synthesizedList[materialType] || 0;

		// skip next iteration for synthesizable materials that
		// is not highest tier that NEEDED.
		if (
			synthesizableData.to !== undefined &&
			responseData[synthesizableData.to] !== undefined
		) {
			continue;
		}

		// this loop is for syntesized materials that is highest tier that NEEDED
		// loop back from highest to lowest
		// to recalibrate synthesized value
		let recheckedMaterial = materialType;
		while (recheckedMaterial !== undefined) {
			// iterator
			let upperTierRecheckedMaterial =
				gameInventoryItem.synthesizable_materials[recheckedMaterial].to;
			let lowerTierRecheckedMaterial =
				gameInventoryItem.synthesizable_materials[recheckedMaterial].from;

			// exit for lowest tier material
			if (lowerTierRecheckedMaterial === undefined) {
				break;
			}

			// if this is the highest tier material that NEEDED
			if (
				responseDataSorted[upperTierRecheckedMaterial] === undefined ||
				responseDataSorted[upperTierRecheckedMaterial].needed <= 0
			) {
				// only syntesize what's needed
				responseDataSorted[recheckedMaterial].synthesized = Math.min(
					responseDataSorted[recheckedMaterial].synthesized,
					responseDataSorted[recheckedMaterial].needed -
						responseDataSorted[recheckedMaterial].owned
				);
				if (responseDataSorted[recheckedMaterial].synthesized < 0) {
					responseDataSorted[recheckedMaterial].synthesized = 0;
				}
			} else {
				// if NOT the highest tier material that needed
				// recalculate synthesized so that only syntesized what's needed

				// calculate synthesized that is needed for higher tier
				let synthesizedNeededForHigherTier = Math.floor(
					responseDataSorted[upperTierRecheckedMaterial].synthesized *
						gameInventoryItem.synthesizable_materials[recheckedMaterial].cost
				);

				// needed current tier + needed for higher tier - owned
				// = synthesized from lower tier
				let calibrateSyntesizedNeed =
					responseDataSorted[recheckedMaterial].needed +
					synthesizedNeededForHigherTier -
					responseDataSorted[recheckedMaterial].owned;

				// if negative, it means potential synthesized material at this tier
				// isn't needed. keep it at lower tier.
				if (calibrateSyntesizedNeed < 0) {
					responseDataSorted[recheckedMaterial].synthesized = 0;
				} else {
					if (
						responseDataSorted[recheckedMaterial].synthesized >=
						calibrateSyntesizedNeed
					) {
						// preemptive logical checking.
						// i have feeling this will be buggy someday.
						responseDataSorted[recheckedMaterial].synthesized =
							calibrateSyntesizedNeed;
					}
				}

				// i think this is also guard condition
				// if unexpected negative, set it to 0
				if (responseDataSorted[recheckedMaterial].synthesized < 0) {
					responseDataSorted[recheckedMaterial].synthesized = 0;
				}
			}
			// recalibrate missing count
			responseDataSorted[recheckedMaterial].missing = Math.max(
				responseDataSorted[recheckedMaterial].needed -
					(responseDataSorted[recheckedMaterial].owned +
						responseDataSorted[recheckedMaterial].synthesized),
				0
			);

			recheckedMaterial = lowerTierRecheckedMaterial;
		}
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
			missing: 0,
			icon: gameInventoryItem.allInventoryItems[materialType].icon,
			label: gameInventoryItem.allInventoryItems[materialType].label,
		};
	}

	return responseData;
};
