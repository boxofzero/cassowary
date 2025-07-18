<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Characters</h1>
	</section>
	<section>
		<div class="flex flex-wrap items-center gap-5">
			<h2>CHARACTER NAME</h2>
			<UInputMenu
				v-model="characterName"
				:avatar="characterName?.avatar"
				:items="characterList"
				:filter-fields="['title']"
				size="xl"
				class="w-3/4"
				:ui="{ item: 'p-4' }"
			>
				<template #item-label="{ item }">
					<span :class="itemRarityColor(item.rarity)">{{ item.title }}</span>
				</template>
			</UInputMenu>
		</div>
		<section v-show="isCharacterNameSet">
			<USeparator label="LEVEL" />
			<div class="">
				<div class="items-center gap-5 grid grid-cols-4">
					<span>Current Level</span>
					<USelect
						:items="levelItems"
						v-model="character['char_current_level']"
						:model-value="character['char_current_level'] || 1"
						@change="upsertPlannedCharacter(characterName)"
					/>
					<span>Target Level</span>
					<USelect
						:items="levelItems"
						v-model="character['char_target_level']"
						:model-value="character['char_target_level'] || 1"
						@change="upsertPlannedCharacter(characterName)"
					/>
				</div>
			</div>

			<USeparator label="SKILLS" />
			<div class="flex flex-row gap-2">
				<div class="p-1 border-gray-800 border-r border-solid basis-3/5">
					<h2>ACTIVE SKILLS</h2>
					<div v-for="(item, index) in activeSkills" :key="index">
						<div class="gap-2 grid grid-cols-5 grid-flow-col auto-cols-max">
							<span class="col-span-2">{{ item.label }}:</span>
							<label>Current Level</label>
							<UInput
								type="number"
								:min="1"
								:max="10"
								v-model="character[item.model_value + '_current_level']"
								:model-value="
									character[item.model_value + '_current_level'] || 1
								"
								@change="upsertPlannedCharacter(characterName)"
							/>
							<label>Target Level</label>
							<UInput
								type="number"
								:min="1"
								:max="10"
								v-model="character[item.model_value + '_target_level']"
								:model-value="
									character[item.model_value + '_target_level'] || 1
								"
								@change="upsertPlannedCharacter(characterName)"
							/>
							<!-- </div> -->
						</div>
					</div>
				</div>
				<div class="p-1 basis-2/5">
					<h2>PASSIVE SKILLS</h2>
					<div class="flex flex-row justify-between items-center gap-2">
						<div
							v-for="(item, index) in passiveSkills"
							:key="index"
							class="w-full"
						>
							<div
								class=""
								v-for="passiveSkill of item.data"
								:key="passiveSkill.model_value"
							>
								<div
									class="items-center gap-2 grid grid-cols-2 grid-flow-col auto-cols-max"
								>
									<label class="col-span-2"
										>{{ item.label }} {{ passiveSkill.label }}</label
									>
									<USwitch
										color="primary"
										v-model="character[passiveSkill.model_value]"
										:model-value="character[passiveSkill.model_value]"
										@change="upsertPlannedCharacter(characterName)"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<USeparator label="MATERIAL NEEDED" />
			<section class="p-3">
				<UButton
					class="mr-3"
					color="primary"
					variant="solid"
					@click="setDone"
					:disabled="!isMaterialsExist"
				>
					Done
				</UButton>
				<span class="inline-block align-middle">
					Press "DONE" to set the current level/skill to the target value and
					adjust the inventory item count
				</span>
			</section>
			<section>
				<div
					class="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
				>
					<InventoryItemMaterialCard
						v-for="(item, index) in materials"
						:index="index"
						:item="item"
						:key="item.key"
						@update-material-count="doEmit"
					>
					</InventoryItemMaterialCard>
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
import * as plannerService from '@/services/plannerService';

import * as util from '@/viewScriptUtils/pagesCharactersIndex';
import * as objectHelper from '@/libraries/objectHelper';

const characterList = util.characterList();

const characterName = ref(undefined);
const isCharacterNameSet = computed(() => {
	return !!characterName.value;
});

function itemRarityColor(rarity) {
	if (rarity == 5) {
		return 'text-yellow-600 dark:text-yellow-300';
	} else if (rarity == 4) {
		return 'text-purple-600 dark:text-purple-300';
	}
	return 'text-blue-600 dark:text-blue-300';
}

watch(characterName, async () => {
	console.log(
		'characterName watcher: changed: ' + JSON.stringify(characterName.value)
	);

	// redirect if url hash is not set
	let urlHash = route.hash.slice(1);
	if (
		urlHash !== undefined &&
		urlHash !== characterName.value.id &&
		objectHelper.has(characters, characterName.value.id)
	) {
		getOrInitPlannedCharacter(characterName.value.id);
		console.log('redirecting to ' + characterName.value.id);
		await navigateTo({ hash: '#' + characterName.value.id });
	}
});

const character = ref({ ...dbPlannedCharacter.character });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedCharacter(characterName.value.id);
};

const toast = useToast();

function upsertPlannedCharacter(characterName) {
	useDebounceFn(() => {
		if (!characterName || !character.value['name']) {
			return;
		}
		usePlannedCharacterStore().upsert(
			character.value['name'],
			objectHelper.omit(character.value, 'name')
		);
	}, 100)().then(() => {
		if (!characterName) {
			return;
		}
		toast.add({
			title:
				'Character ' +
				characters[characterName.id].display_name +
				' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			duration: 2000,
		});
		materials.value = util.getNeededMaterials(characterName.id);
	});
}

const setDone = () => {
	useDebounceFn(() => {
		plannerService.setCharacterDone(character.value, materials.value);
	}, 100)().then(() => {
		getOrInitPlannedCharacter(characterName.value.id);
	});
};

const route = useRoute();

function initCharacterFromHash() {
	// get character name from url hash
	let urlHash = route.hash.slice(1);

	if (urlHash !== undefined && objectHelper.has(characters, urlHash)) {
		characterName.value = characterList.find((item) => item.value === urlHash);
		getOrInitPlannedCharacter(characterName.value.id);
	}
}

function getOrInitPlannedCharacter(characterName) {
	character.value = usePlannedCharacterStore().getOrInitEntry(characterName);
	character.value['name'] = characterName;

	materials.value = util.getNeededMaterials(characterName);
}

onBeforeMount(() => {
	// init store
	usePlannedCharacterStore().init();

	// init char if url has hash
	initCharacterFromHash();
});

// watch(
// 	() => route.hash,
// 	() => {
// 		let urlHash = route.hash.slice(1);

// 		console.log('route hash changed: ' + urlHash);
// 		if (urlHash !== undefined && objectHelper.has(characters, urlHash)) {
// 			characterOption = characterList.find((item) => item.value === urlHash);
// 			characterName.value = urlHash;
// 			console.log('characterName changed: ' + characterName.value);
// 			getOrInitPlannedCharacter(characterName.value);
// 		} else {
// 			characterOption = {};
// 			characterName.value = '';
// 		}
// 	}
// );
</script>
