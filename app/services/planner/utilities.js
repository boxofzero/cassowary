import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';
import * as gameCharacters from '~/data/game/gameCharacter';

export const getLevelRangeDiff = (arrayData, currentLevel, targetLevel) => {
	// index of currentLevel
	const currentLevelIndex = arrayData.findIndex(
		(arr) => arr.level == currentLevel
	);

	// index of targetLevel
	const targetLevelIndex = arrayData.findIndex(
		(arr) => arr.level == targetLevel
	);

	// e.g.: if 1 and 60A, expects [50, 50A, 60, 60A]
	return arrayData
		.slice(0, targetLevelIndex + 1)
		.filter((item) => !arrayData.slice(0, currentLevelIndex).includes(item))
		.slice(1);
};

export const isTieredMaterialType = (material) => {
	return Object.keys(gameInventoryItem.tiered_materials_per_type).includes(
		material
	);
};

export const getMaterialsFromLevelListStatList = (
	name,
	statsToFarm,
	gameDataList = gameCharacters.characters
) => {
	const materials = {};

	// looping into stats
	for (let stat in statsToFarm) {
		// looping into list of levels to farm
		// passive will not have level but data is adjusted (pretend only level 1)
		for (let level of statsToFarm[stat]) {
			for (let materialType in level.materials) {
				// inventory exp and credit (not named materials)
				if (['weap_exp', 'char_exp', 'shell_credit'].includes(materialType)) {
					materials[materialType] =
						(materials[materialType] ?? 0) +
						(level.materials?.[materialType] ?? 0);
					continue;
				}

				// get the materialType's material name
				const materialName = gameDataList[name][materialType];
				// inventory tiered materials
				if (isTieredMaterialType(materialType)) {
					for (let tier in level.materials[materialType]) {
						const tieredMaterialName =
							gameInventoryItem.tiered_materials_per_type[materialType][
								materialName
							][tier].name;
						console.log('materials: ' + JSON.stringify(materials));
						console.log('tieredMaterialName: ' + tieredMaterialName);
						console.log('tier: ' + tier);
						console.log('level.materials: ' + JSON.stringify(level.materials));
						materials[tieredMaterialName] =
							(materials[tieredMaterialName] ?? 0) +
							(level.materials?.[materialType][tier] ?? 0);
					}
					continue;
				}

				// inventory other materials
				materials[materialName] =
					(materials[materialName] ?? 0) +
					(level.materials?.[materialType] ?? 0);
			}
		}
	}

	return materials;
};
