import { charactersStatMaterial } from '@/gameData/charactersStatMaterial';

export const getLevelRangeDiff = (arrayData, currentLevel, targetLevel) => {
	// index of currentLevel
	const currentLevelIndex = useFindIndex(arrayData, (arr) => {
		return arr.level == currentLevel;
	});

	// index of targetLevel
	const targetLevelIndex = useFindIndex(arrayData, (arr) => {
		return arr.level == targetLevel;
	});

	// e.g.: if 1 and 60A, expects [50, 50A, 60, 60A]
	// only useDifference will still include 1
	// so need useDrop to remove 1
	return useDrop(
		useDifference(
			arrayData.slice(0, targetLevelIndex + 1),
			arrayData.slice(0, currentLevelIndex)
		)
	);
};

export const isTieredMaterialType = (material) => {
	return [
		'tiered_enemy_drop_weapon_skill_material',
		'tiered_forgery_weapon_skill_material',
	].includes(material);
};

export const getMaterialsFromLevelListStatList = (
	characterName,
	statsToFarm
) => {
	const materials = {};

	// looping into stats
	for (let stat in statsToFarm) {
		// looping into list of levels to farm
		// passive will not have level but data is adjusted (pretend only level 1)
		for (let level of statsToFarm[stat]) {
			for (let materialType in level.materials) {
				// inventory exp and credit (not named materials)
				if (['exp', 'credit'].includes(materialType)) {
					useSet(
						materials,
						materialType,
						useGet(materials, materialType, 0) + level.materials[materialType]
					);
					continue;
				}

				// get the materialType's material name
				const materialName =
					charactersStatMaterial[characterName][materialType];
				// inventory tiered materials
				if (isTieredMaterialType(materialType)) {
					if (materials[materialType] === undefined) {
						materials[materialType] = {};
						materials[materialType][materialName] = {};
					}
					for (let tier in level.materials[materialType]) {
						useSet(
							materials[materialType][materialName],
							tier,
							useGet(materials[materialType][materialName], tier, 0) +
								level.materials[materialType][tier]
						);
					}
					continue;
				}

				// inventory other materials
				if (materials[materialType] === undefined) {
					materials[materialType] = {};
					materials[materialType][materialName] = 0;
				}
				useSet(
					materials[materialType],
					materialName,
					useGet(materials[materialType], materialName, 0) +
						level.materials[materialType]
				);
			}
		}
	}

	return materials;
};
