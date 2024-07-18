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
				:model-value="character['char_current_level']"
				@update:modelValue="upsertPlannedCharacter()"
			></v-select>
			<v-select
				label="Target Level"
				:items="levelItems"
				item-title="label"
				item-value="value"
				v-model="character['char_target_level']"
				:model-value="character['char_target_level']"
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
						:min="0"
						:max="10"
						:model-value="character[item.model_value + '_current_level']"
						v-model="character[item.model_value + '_current_level']"
						@update:modelValue="upsertPlannedCharacter()"
					></v-number-input>

					<v-number-input
						control-variant="stacked"
						inset
						density="compact"
						label="Target Level"
						:min="0"
						:max="10"
						:model-value="character[item.model_value + '_target_level']"
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
						:name="item.label"
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
						:name="item.label"
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
	<div>
		<!-- show the material needed -->
		<div>
			<UChip inset text="3" size="2xl">
				<div class="box-border h-16 w-16 mx-1">
					<img src="https://placehold.co/64/png" alt="Material" />
					<v-number-input
						:min="0"
						:max="99999"
						:model-value="1"
						v-model="mat1"
						control-variant="stacked"
						inset
						density="compact"
					></v-number-input>
				</div>
			</UChip>
		</div>
	</div>
</template>

<script setup>
import { charactersStatMaterial } from '~/gameData/charactersStatMaterial';
import { characterFormScheme } from '~/dbSchemeData/plannedCharacter';
import {
	levelItems,
	activeSkills,
	passiveSkills,
} from '~/forms/characters/new/charactersNewFormData';
import { usePlannedCharacterStore } from '@/stores/plannedCharacters';
import * as plannerService from '@/services/plannerService';

// FORM DATA
const characterList = Object.keys(charactersStatMaterial);

// STORE
const plannedCharacterStore = usePlannedCharacterStore();

const characterName = ref('');
const character = ref({ ...characterFormScheme });

const getOrInitPlannedCharacter = (characterName) => {
	character.value = plannedCharacterStore.getOrInitEntry(characterName);
	character.value['name'] = characterName;

	const mats = plannerService.getMaterialsNeeded(characterName);
	console.log('levellingMaterials: ' + JSON.stringify(mats));
};

const upsertPlannedCharacter = () => {
	console.log('character: ' + JSON.stringify(character.value));
	plannedCharacterStore.upsert(
		character.value['name'],
		useOmit(character.value, 'name')
	);

	const mats = plannerService.getMaterialsNeeded(characterName.value);
	console.log('levellingMaterials: ' + JSON.stringify(mats));
};

// TODO material needed
const mat1 = ref(0);

// TODO set DONE (consume material
// and increase current and set done passive)

onBeforeMount(() => {
	plannedCharacterStore.init();
});
</script>
