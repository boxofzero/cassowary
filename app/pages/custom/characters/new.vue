<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Create new custom character</h1>
	</section>

	<section>
		<div class="flex flex-col gap-1 p-3">
			<span>Name</span>
			<UInput v-model="newCustomCharacter.title" />
			<span>Description</span>
			<UTextarea v-model="newCustomCharacter.description" />
			<span>Weapon Type</span>
			<USelect
				:items="weaponType"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['weapon_type']"
				:model-value="newCustomCharacter['weapon_type']"
			/>
			<span>Element</span>
			<USelect
				:items="charElement"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['char_element']"
				:model-value="newCustomCharacter['char_element']"
			/>
			<span>Rarity</span>
			<USelect
				:items="[4, 5]"
				v-model:open="newCustomCharacter['rarity']"
				:model-value="newCustomCharacter['rarity']"
			/>
			<span>Enemy drop weapon/skill material</span>
			<USelect
				:items="enemyDropMaterials"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['enemy_drop_material']"
				:model-value="newCustomCharacter['enemy_drop_material']"
			/>
			<span>Ascension Material</span>
			<USelect
				:items="ascensionMaterials"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['ascension_material']"
				:model-value="newCustomCharacter['ascension_material']"
			/>
			<span>Overworld Resource Material</span>
			<USelect
				:items="overworldMaterials"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['overworld_material']"
				:model-value="newCustomCharacter['overworld_material']"
			/>
			<span>Weekly boss material</span>
			<USelect
				:items="weeklyBossMaterials"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['weekly_boss_material']"
				:model-value="newCustomCharacter['weekly_boss_material']"
			/>
			<span>Forgery weapon/skill material</span>
			<USelect
				:items="forgeryMaterials"
				option-attribute="label"
				value-attribue="value"
				v-model:open="newCustomCharacter['forgery_material']"
				:model-value="newCustomCharacter['forgery_material']"
			/>
			<UButton
				class="justify-center mt-3 w-1/5"
				color="primary"
				variant="solid"
				@click=""
			>
				Create character
			</UButton>
		</div>
	</section>
</template>

<script setup>
import * as gameInventoryItem from '@/data/game/inventoryItem/gameInventoryItem';
import * as gameInventoryItemConfig from '@/data/game/inventoryItem/gameInventoryItemConfig';
import * as stringHelper from '@/libraries/stringHelper';

const newCustomCharacter = ref({});
const weaponType = [
	{
		label: 'Broadblade',
		value: 'broadblade',
	},
	{
		label: 'Sword',
		value: 'sword',
	},
	{
		label: 'Pistols',
		value: 'pistols',
	},
	{
		label: 'Gauntlets',
		value: 'gauntlets',
	},
	{
		label: 'Rectifier',
		value: 'rectifier',
	},
];

const charElement = [
	{
		label: 'Glacio',
		value: 'glacio',
	},
	{
		label: 'Fusion',
		value: 'fusion',
	},
	{
		label: 'Electro',
		value: 'electro',
	},
	{
		label: 'Aero',
		value: 'aero',
	},
	{
		label: 'Spectro',
		value: 'spectro',
	},
	{
		label: 'Havoc',
		value: 'havoc',
	},
];

const enemyDropMaterials =
	gameInventoryItemConfig.tiered_enemy_drop_weapon_skill_material.map(function (
		value,
		key
	) {
		return {
			label: stringHelper.startCase(key),
			value: key,
		};
	});
const ascensionMaterials = gameInventoryItem.boss_ascension_material.map(
	function (value, key) {
		return {
			label: value.label,
			value: key,
		};
	}
);
const overworldMaterials =
	gameInventoryItem.overworld_resource_ascension_material.map(function (
		value,
		key
	) {
		return {
			label: value.label,
			value: key,
		};
	});
const weeklyBossMaterials =
	gameInventoryItem.weekly_boss_skill_upgrade_material.map(function (
		value,
		key
	) {
		return {
			label: value.label,
			value: key,
		};
	});
const forgeryMaterials =
	gameInventoryItemConfig.tiered_forgery_weapon_skill_material.map(function (
		value,
		key
	) {
		return {
			label: stringHelper.startCase(key),
			value: key,
		};
	});
</script>
