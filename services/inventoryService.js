import { useInventoryItemStore } from '@/stores/inventoryItems';
import * as inventoryItemMetadata from '@/gameData/inventoryItemMetadata';

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
			metadata: inventoryItemMetadata[materialType][material],
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
			data[material][tier] = {
				owned: ownedMaterials[materialType][material][tier] || {},
				needed: neededMaterials[materialType][material][tier] || {},
				metadata: inventoryItemMetadata[materialType][material][tier],
			};
		}
	}
	return data;
};

const generateExpData = (expNeeded, ownedExpMaterials, expMaterialType) => {
	const data = {};
	// calculate exp_value I have
	// const ownedExp = useReduce(
	// 	ownedExpMaterials,
	// 	function (acc, data, expMaterial) {
	// 		// owned count * exp_value
	// 		acc = acc + data.count * expMaterialType[expMaterial].exp_value;
	// 		return acc;
	// 	},
	// 	0
	// );
	let expNeededCounting = expNeeded;
	let expLeftover = 0;
	for (let expData of useSortBy(
		useToPairs(expMaterialType),
		(v) => v[1].exp_value
	)) {
		const expDataNeeded = expNeededCounting / expData[1].exp_value;
		expLeftover = expNeededCounting % expData[1].exp_value;
		data[expData[0]] = {
			owned: ownedExpMaterials[expData[0]] || 0,
			needed: expDataNeeded || 0,
			metadata: expData[1],
		};
		expNeededCounting = expLeftover;
	}

	return data;
};
export const getMaterialNeededResponseData = (neededMaterials) => {
	let responseData = {};
	const ownedMaterials = useInventoryItemStore().inventoryItems;

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
			metadata: inventoryItemMetadata.credit,
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

	// weapon_skill_material :
	const weaponSkillMaterial = getTieredMaterialsData(
		ownedMaterials,
		neededMaterials,
		'weapon_skill_material'
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
	const inventoryItems = useInventoryItemStore().inventoryItems;
};
