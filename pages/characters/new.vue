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
			v-model="character.name"
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
			></v-select>
			<v-select
				label="Target Level"
				:items="levelItems"
				item-title="label"
				item-value="value"
				v-model="character['char_target_level']"
				:model-value="character['char_target_level']"
			></v-select>
		</div>
	</div>

	<UDivider label="SKILLS" />
	<div class="flex">
		<div class="w-1/2 p-5">
			<h2>ACTIVE SKILLS</h2>
			<div v-for="(item, index) in activeSkills" :key="index">
				<p>{{ item.label }}</p>
				<div class="columns-2">
					<p>Current Level</p>
					<v-number-input
						:min="0"
						:max="20"
						:model-value="character[item.model_value + '_current_level']"
						v-model="character[item.model_value + '_current_level']"
						control-variant="stacked"
						inset
					></v-number-input>

					<p>Target Level</p>
					<v-number-input
						:min="0"
						:max="20"
						:model-value="character[item.model_value + '_target_level']"
						v-model="character[item.model_value + '_target_level']"
						control-variant="stacked"
						inset
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
					class="pb-2"
				>
					<p>{{ item.label }}</p>
					<v-btn-toggle
						color="primary"
						:name="item.item_name"
						class="size-full"
						:model-value="character[item.item_name]"
						v-model="character[item.item_name]"
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
					class="pb-2"
				>
					<p>{{ item.label }}</p>
					<v-btn-toggle
						color="primary"
						:name="item.item_name"
						class="size-full"
						:model-value="character[item.item_name]"
						v-model="character[item.item_name]"
					>
						<v-btn class="size-1/2">🔔</v-btn>
						<v-btn class="size-1/2">✅</v-btn>
					</v-btn-toggle>
				</div>
			</div>
		</div>
	</div>

	<UDivider label="MATERIAL NEEDED" />
	<!-- show the material needed -->
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
</template>

<script setup>
import { charactersV2 } from '~/libraries/charactersV2';
import { characterFormScheme } from '~/libraries/plannedCharacters';

// FORM DATA
const characterList = Object.keys(charactersV2);
const levelItems = [
	{ value: '1', label: '1' },
	{ value: '50', label: '50' },
	{ value: '50A', label: '50 Ascended' },
	{ value: '60', label: '60' },
	{ value: '60A', label: '60 Ascended' },
	{ value: '70', label: '70' },
	{ value: '70A', label: '70 Ascended' },
	{ value: '80', label: '80' },
	{ value: '80A', label: '80 Ascended' },
	{ value: '90', label: '90' },
];
const activeSkills = [
	{
		label: 'Basic Attack',
		model_value: 'basic_attack',
	},
	{
		label: 'Resonance Skill',
		model_value: 'resonance_skill',
	},
	{
		label: 'Forte Circuit',
		model_value: 'forte_circuit',
	},
	{
		label: 'Resonance Liberation',
		model_value: 'resonance_liberation',
	},
	{
		label: 'Intro Skill',
		model_value: 'intro_skill',
	},
];
const passiveSkills = {
	tier_1: [
		{
			label: 'Passive Skill 1',
			item_name: 'passive_skill_1',
		},
		{
			label: 'Stat 1',
			item_name: 'bonus_stat_tier_1_stat_1',
		},
		{
			label: 'Stat 2',
			item_name: 'bonus_stat_tier_1_stat_2',
		},
		{
			label: 'Stat 3',
			item_name: 'bonus_stat_tier_1_stat_3',
		},
		{
			label: 'Stat 4',
			item_name: 'bonus_stat_tier_1_stat_4',
		},
	],
	tier_2: [
		{
			label: 'Passive Skill 2',
			item_name: 'passive_skill_2',
		},
		{
			label: 'Stat 1',
			item_name: 'bonus_stat_tier_2_stat_1',
		},
		{
			label: 'Stat 2',
			item_name: 'bonus_stat_tier_2_stat_2',
		},
		{
			label: 'Stat 3',
			item_name: 'bonus_stat_tier_2_stat_3',
		},
		{
			label: 'Stat 4',
			item_name: 'bonus_stat_tier_2_stat_4',
		},
	],
};

const characterName = ref('');
const character = ref({ ...characterFormScheme });
console.log('character: ' + character.value);
const charCurrentLevel = ref(1);
watch(characterName, () => {
	console.log('characterName changed into: ' + characterName.value);
	// load plannedCharacter for that characterName
});
watch(
	character,
	() => {
		console.log('character watched: ' + JSON.stringify(character.value));
	},
	{ deep: true }
);

const onInputAction = (characterName, key, value) => {
	console.log('character name: ' + characterName);
	console.log('key: ' + key);
	console.log('value: ' + value);
};
</script>
