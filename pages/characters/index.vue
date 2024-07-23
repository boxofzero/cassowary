<template>
	<section class="">
		<h1 class="">Add New Character To Planner</h1>
	</section>
	<!--
	add character yinlin
	load character yinlin material requirement
	if user has planned character where yinlin, load the data
	if user doesnt have planned character yinlin, prepare new planned character
	-->
	<div>
		<h2>CHARACTER NAME</h2>
		<v-select
			label="Select"
			:items="characterList"
			v-model="characterName"
			@update:modelValue="getOrInitPlannedCharacter($event)"
		></v-select>
	</div>
	<UDivider label="LEVEL" />
	<div>
		<div class="grid grid-cols-2 gap-2">
			<v-select
				label="Current Level"
				:items="levelItems"
				item-title="label"
				item-value="value"
				v-model="character['char_current_level']"
				:model-value="character['char_current_level'] || 1"
				@update:modelValue="upsertPlannedCharacter()"
			></v-select>
			<v-select
				label="Target Level"
				:items="levelItems"
				item-title="label"
				item-value="value"
				v-model="character['char_target_level']"
				:model-value="character['char_target_level'] || 1"
				@update:modelValue="upsertPlannedCharacter()"
			></v-select>
		</div>
	</div>

	<UDivider label="SKILLS" />
	<div class="flex">
		<div class="w-1/2 p-2">
			<h2>ACTIVE SKILLS</h2>
			<div v-for="(item, index) in activeSkills" :key="index">
				<p>{{ item.label }}</p>
				<div class="columns-2 -">
					<v-number-input
						control-variant="stacked"
						inset
						density="compact"
						label="Current Level"
						:min="1"
						:max="10"
						:model-value="character[item.model_value + '_current_level'] || 1"
						v-model="character[item.model_value + '_current_level']"
						@update:modelValue="upsertPlannedCharacter()"
					></v-number-input>

					<v-number-input
						control-variant="stacked"
						inset
						density="compact"
						label="Target Level"
						:min="1"
						:max="10"
						:model-value="character[item.model_value + '_target_level'] || 1"
						v-model="character[item.model_value + '_target_level']"
						@update:modelValue="upsertPlannedCharacter()"
					></v-number-input>
				</div>
			</div>
		</div>
		<div class="w-1/4 p-2">
			<h2>TIER 1</h2>
			<div>
				<div
					v-for="(item, index) in passiveSkills.tier_1"
					:key="index"
					class=""
				>
					<p>{{ item.label }}</p>
					<v-btn-toggle
						color="primary"
						class="size-full"
						:model-value="character[item.model_value]"
						v-model="character[item.model_value]"
						@update:modelValue="upsertPlannedCharacter()"
					>
						<v-btn class="size-1/2">🔔</v-btn>
						<v-btn class="size-1/2">✅</v-btn>
					</v-btn-toggle>
				</div>
			</div>
		</div>
		<div class="w-1/4 p-2">
			<h2>TIER 2</h2>
			<div>
				<div
					v-for="(item, index) in passiveSkills.tier_2"
					:key="index"
					class=""
				>
					<p>{{ item.label }}</p>
					<v-btn-toggle
						color="primary"
						class="size-full"
						:model-value="character[item.model_value]"
						v-model="character[item.model_value]"
						@update:modelValue="upsertPlannedCharacter()"
					>
						<v-btn class="size-1/2">🔔</v-btn>
						<v-btn class="size-1/2">✅</v-btn>
					</v-btn-toggle>
				</div>
			</div>
		</div>
	</div>

	<UDivider label="MATERIAL NEEDED" />
	<section>
		<div class="grid grid-cols-6 gap-6">
			<div class="" v-for="(item, index) in materials" :key="index">
				<InventoryItemMaterialCard
					:index="index"
					:item="item"
				></InventoryItemMaterialCard>
			</div>
		</div>
	</section>
</template>

<script setup>
import { characters } from '~/data/game/gameCharacters';
import * as dbPlannedCharacter from '~/data/database/dbPlannedCharacter';
import {
	levelItems,
	activeSkills,
	passiveSkills,
} from '~/data/form/characters/formCharactersNew';
import { usePlannedCharacterStore } from '@/stores/plannedCharacters';
import * as characterService from '@/services/characterService';
import * as inventoryService from '@/services/inventoryService';

// FORM DATA
const characterList = Object.keys(characters);

// STORE
const plannedCharacterStore = usePlannedCharacterStore();

const characterName = ref('');
const character = ref({ ...dbPlannedCharacter.character });
const materials = ref({});

// METHODS
const getOrInitPlannedCharacter = (characterName) => {
	character.value = plannedCharacterStore.getOrInitEntry(characterName);
	character.value['name'] = characterName;

	materials.value = getMaterialsNeeded(characterName);
};

const upsertPlannedCharacter = () => {
	if (!characterName.value) {
		return;
	}
	plannedCharacterStore
		.upsert(character.value['name'], useOmit(character.value, 'name'))
		.then(() => {
			materials.value = getMaterialsNeeded(characterName.value);
		});
};

// TODO material needed
const getMaterialsNeeded = (characterName) => {
	const neededMaterials =
		characterService.getCharacterNeededMaterials(characterName);
	const ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	return ownedNeededMaterialsResponseData;
};

// TODO set DONE (consume material
// and increase current and set done passive)

onBeforeMount(() => {
	plannedCharacterStore.init();
});
</script>
