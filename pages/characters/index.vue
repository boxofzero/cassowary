<template>
	<section class="">
		<h1 class="">Add New Character To Planner</h1>
	</section>
	<section>
		<div>
			<h2>CHARACTER NAME</h2>
			<v-autocomplete
				label="Select"
				:items="characterList()"
				item-title="title"
				item-value="value"
				:menu-props="{ maxHeight: '200' }"
				:custom-filter="customFilter"
				v-model="characterName"
				@update:modelValue="getOrInitPlannedCharacter($event)"
			>
				<template v-slot:item="{ props, item }">
					<v-list-item
						v-bind="props"
						:subtitle="item.raw.subtitle"
						:prepend-avatar="item.raw.icon"
					>
					</v-list-item>
				</template>
			</v-autocomplete>
		</div>
		<section v-show="isCharacterNameSet">
			<UDivider label="LEVEL" />
			<div class="">
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
						<div class="">
							<div>
								<p>{{ item.label }}</p>
							</div>
							<div class="columns-2">
								<v-number-input
									control-variant="stacked"
									inset
									density="compact"
									label="Current Level"
									:min="1"
									:max="10"
									:model-value="
										character[item.model_value + '_current_level'] || 1
									"
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
									:model-value="
										character[item.model_value + '_target_level'] || 1
									"
									v-model="character[item.model_value + '_target_level']"
									@update:modelValue="upsertPlannedCharacter()"
								></v-number-input>
							</div>
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
			<section class="p-3">
				<v-btn class="mr-5" @click="setDone">Done</v-btn>
				<span class="inline-block align-middle">
					Press "DONE" to set the current level/skill to the target value and
					adjust the inventory item count
				</span>
			</section>
			<section>
				<div class="grid grid-cols-6 gap-6">
					<div class="" v-for="(item, index) in materials" :key="index">
						<InventoryItemMaterialCard
							:index="index"
							:item="item"
							:key="index"
							@update-material-count="doEmit"
						></InventoryItemMaterialCard>
					</div>
				</div>
			</section>
		</section>
	</section>
</template>

<script setup>
import { characters } from '~/data/game/gameCharacter';
import * as dbPlannedCharacter from '~/data/database/dbPlannedCharacter';
import {
	levelItems,
	activeSkills,
	passiveSkills,
} from '~/data/form/characters/formCharactersNew';
import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import * as characterService from '@/services/characterService';
import * as inventoryService from '@/services/inventoryService';
import * as plannerService from '@/services/plannerService';

// FORM DATA
const characterList = () => {
	let list = [];
	useForEach(characters, (character, characterName) => {
		const subtitle = character.rarity + '⭐';
		list = useConcat(list, {
			value: characterName,
			title: character.display_name,
			subtitle: subtitle,
			icon: character.icon,
		});
	});
	return list;
};

// STORE
const plannedCharacterStore = usePlannedCharacterStore();

const characterName = ref('');
const isCharacterNameSet = computed(() => {
	return !!characterName.value;
});
const character = ref({ ...dbPlannedCharacter.character });
const materials = ref({});

// METHODS

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedCharacter(characterName.value);
};
const getOrInitPlannedCharacter = (characterName) => {
	console.log('getOrInitPlannedCharacter called with: ' + characterName);
	character.value = plannedCharacterStore.getOrInitEntry(characterName);
	character.value['name'] = characterName;

	materials.value = getMaterialsNeeded(characterName);
	console.log('materials: ' + JSON.stringify(materials.value));
	console.log('characters: ' + JSON.stringify(character.value));
};

const upsertPlannedCharacter = () => {
	debounceUpsertPlannedCharacter().then(() => {
		if (!characterName.value) {
			return;
		}
		materials.value = getMaterialsNeeded(characterName.value);
	});
};

const debounceUpsertPlannedCharacter = useDebounceFn(() => {
	if (!characterName.value) {
		return;
	}
	plannedCharacterStore.upsert(
		character.value['name'],
		useOmit(character.value, 'name')
	);
}, 100);

const getMaterialsNeeded = (characterName) => {
	console.log('getMaterialsNeeded called');
	let neededMaterials =
		characterService.getCharacterNeededMaterials(characterName);
	console.log('neededMaterials: ' + JSON.stringify(neededMaterials));
	let ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	console.log(
		'ownedNeededMaterialsResponseData: ' +
			JSON.stringify(ownedNeededMaterialsResponseData)
	);
	return ownedNeededMaterialsResponseData;
};

const setDone = () => {
	debounceSetDone().then(() => {
		console.log('materials: ' + JSON.stringify(materials.value));
		materials.value = getMaterialsNeeded(characterName.value);
		console.log(
			'material.value inside after getMaterialsNeeded: ' +
				JSON.stringify(materials.value)
		);
		getOrInitPlannedCharacter(characterName.value);
	});
};

const debounceSetDone = useDebounceFn(() => {
	plannerService.setCharacterDone(character.value, materials.value);
	console.log('plannerService.setCharacterDone done');
}, 100);

onBeforeMount(() => {
	plannedCharacterStore.init();
});
</script>
