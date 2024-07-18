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

export const isTierableMaterialType = (material) => {
	return ['enemy_drop_weapon_skill_material', 'weapon_skill_material'].includes(
		material
	);
};

export const getMaterialsFromLevelListStatList = (
	characterName,
	statsToFarm
) => {
	const materials = {};

	// looping into stats
	for (let stat in statsToFarm) {
		// looping into list of levels to farm
		// passive will not have level but data is adjusted
		for (let level of statsToFarm[stat]) {
			for (let material in level.materials) {
				// inventory exp and credit (not named materials)
				if (['exp', 'credit'].includes(material)) {
					useSet(
						materials,
						material,
						useGet(materials, material, 0) + level.materials[material]
					);
					continue;
				}

				// get the material name
				const materialName = charactersStatMaterial[characterName][material];
				// inventory tierable materials
				if (isTierableMaterialType(material)) {
					if (materials[material] === undefined) {
						materials[material] = {
							[materialName]: {},
						};
					}
					for (let tier in level.materials[material]) {
						useSet(
							materials[material][materialName],
							tier,
							useGet(materials[material][materialName], tier, 0) +
								level.materials[material][tier]
						);
					}
					continue;
				}

				// inventory other materials
				if (materials[material] === undefined) {
					materials[material] = {
						[materialName]: 0,
					};
				}
				useSet(
					materials[material],
					materialName,
					useGet(materials[material], materialName, 0) +
						level.materials[material]
				);
			}
		}
	}

	return materials;
};
