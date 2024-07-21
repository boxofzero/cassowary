import { useInventoryItemStore } from '@/stores/inventoryItems';
import * as inventoryItemMetadata from '@/gameData/inventoryItemMetadata';
import * as plannerService from '@/services/plannerService';

const getNonTieredMaterialsData = (
	ownedMaterials,
	neededMaterials,
	materialType
) => {
	const data = {};
	for (let material in neededMaterials[materialType]) {
		data[material] = {
			owned: ownedMaterials[materialType][material] || {},
			needed: neededMaterials[materialType][material] || {},
			icon: inventoryItemMetadata[materialType][material].icon,
		};
	}
	return data;
};

const getTieredMaterialsData = (
	ownedMaterials,
	neededMaterials,
	materialType
) => {
	const data = {};
	// console.log(
	// 	'ownedMaterials[materialType]: ' +
	// 		JSON.stringify(ownedMaterials[materialType])
	// );
	for (let material in neededMaterials[materialType]) {
		data[material] = {};
		for (let tier of [1, 2, 3, 4]) {
			// make it flatten data like in inventoryItems
			const materialName =
				inventoryItemMetadata.tiered_materials[material][tier].name;
			data[materialName] = {
				owned: ownedMaterials[materialType][material][tier] || {},
				needed: neededMaterials[materialType][material][tier] || {},
				icon: inventoryItemMetadata.tiered_materials[material][tier].icon,
			};
		}
	}
	return data;
};

const generateExpData = (
	expNeeded,
	ownedExpMaterials,
	expMaterialTypeStructure
) => {
	const data = {};
	// calculate exp_value I have
	// const ownedExp = useReduce(
	// 	ownedExpMaterials,
	// 	function (acc, data, expMaterial) {
	// 		// owned count * exp_value
	// 		acc = acc + data.count * expMaterialTypeStructure[expMaterial].exp_value;
	// 		return acc;
	// 	},
	// 	0
	// );
	let expNeededCounting = expNeeded;
	let expLeftover = 0;
	const expDataSortedDesc = useSortBy(
		useToPairs(expMaterialTypeStructure),
		(v) => -v[1].exp_value
	);
	for (let expData of expDataSortedDesc) {
		const expDataNeeded = expNeededCounting / expData[1].exp_value;
		expLeftover = expNeededCounting % expData[1].exp_value;
		data[expData[0]] = {
			owned: ownedExpMaterials[expData[0]] || 0,
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
	// console.log('ownedMaterials: ' + JSON.stringify(ownedMaterials));

	// exp : use only the 4th tier
	const charExp = generateExpData(
		neededMaterials.resonator_exp_material,
		ownedMaterials.resonator_exp_material,
		inventoryItemMetadata.resonator_exp_material
	);
	// credit : just number
	const credit = {
		credit: {
			owned: ownedMaterials.credit,
			needed: neededMaterials.credit,
			icon: inventoryItemMetadata.credit.credit.icon,
		},
	};
	// non-tiered materials
	// boss_ascension_material
	const bossAscensionMaterial = getNonTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'boss_ascension_material'
	);
	// weekly_boss_skill_upgrade_material
	const weeklyBossSkillUpgradeMaterial = getNonTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'weekly_boss_skill_upgrade_material'
	);
	// overworld_resource_ascension_material :
	const overworldResourceAscensionMaterial = getNonTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'overworld_resource_ascension_material'
	);

	// tiered materials
	// enemy_drop_weapon_skill_material :
	const enemyDropWeaponSkillMaterial = getTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'enemy_drop_weapon_skill_material'
	);

	// forgery_weapon_skill_material :
	const weaponSkillMaterial = getTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'forgery_weapon_skill_material'
	);

	responseData = {
		...charExp,
		...credit,
		...bossAscensionMaterial,
		...weeklyBossSkillUpgradeMaterial,
		...overworldResourceAscensionMaterial,
		...enemyDropWeaponSkillMaterial,
		...weaponSkillMaterial,
	};
	return responseData;
};

export const getAllMaterialsDisplayData = () => {
	let displayData = {};
	useInventoryItemStore().init();
	const allMaterials = plannerService.getAllCharactersMaterialsNeeded();
	// console.log('allMaterials: ' + JSON.stringify(allMaterials));
	const ownedNeededMaterialsResponseData =
		getOwnedNeededMaterialsResponseData(allMaterials);
	const inventoryItems = useInventoryItemStore().inventoryItems;
	console.log('inventoryItems: ' + JSON.stringify(inventoryItems));

	for (let materialType in inventoryItems) {
		if (materialType === 'credit') {
			displayData[materialType] = {
				owned: ownedNeededMaterialsResponseData[materialType].owned,
				needed: ownedNeededMaterialsResponseData[materialType].needed,
				icon: inventoryItemMetadata.inventoryItems[materialType].credit.icon,
			};
			continue;
		}
		for (let material in inventoryItems[materialType]) {
			if (ownedNeededMaterialsResponseData[material] === undefined) {
				displayData[material] = {
					owned: 0,
					needed: 0,
					icon: inventoryItemMetadata.inventoryItems[materialType][material]
						.icon,
				};
				continue;
			}

			displayData[material] = {
				owned: ownedNeededMaterialsResponseData[material].owned,
				needed: ownedNeededMaterialsResponseData[material].needed,
				icon: inventoryItemMetadata.inventoryItems[materialType][material].icon,
			};
		}
	}

	return displayData;
};
