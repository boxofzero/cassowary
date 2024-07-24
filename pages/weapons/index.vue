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
		<h2>WEAPON NAME</h2>
		<v-select
			label="Select"
			:items="characterList"
			v-model="characterName"
			@update:modelValue="getOrInitPlannedCharacter($event)"
		></v-select>
	</div>
	<section v-show="isCharacterNameSet">
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
	</section>
</template>

<script setup>
import { characters } from '@/data/game/gameCharacters';
import * as dbPlannedCharacter from '@/data/database/dbPlannedCharacter';
import {
	levelItems,
	activeSkills,
	passiveSkills,
} from '@/data/form/characters/formCharactersNew';
import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import * as characterService from '@/services/characterService';
import * as inventoryService from '@/services/inventoryService';

// FORM DATA
const characterList = useSortBy(Object.keys(characters));

// STORE
const plannedCharacterStore = usePlannedCharacterStore();

const characterName = ref('');
const isCharacterNameSet = computed(() => {
	return !!characterName.value;
});
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
