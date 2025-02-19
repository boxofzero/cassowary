<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Characters</h1>
	</section>
	<section>
		<div class="flex flex-wrap items-center gap-5">
			<h2>CHARACTER NAME</h2>
			<UInputMenu
				searchable
				searchable-placeholder="Select character"
				class="w-3/4"
				placeholder="Select character"
				v-model="characterOption"
				:options="characterList()"
				option-attribute="title"
				:search-attributes="['title', 'subtitle']"
				@change="getOrInitCharacterName($event)"
				size="xl"
			>
				<template #leading>
					<UAvatar v-bind="characterOption.avatar" size="xs" class="" />
				</template>
				<template #option="{ option: character }">
					<UAvatar v-bind="character.avatar" size="md" class="mr-2" />
					<span
						v-if="character.rarity == 3"
						class="text-blue-600 dark:text-blue-300"
						>{{ character.title }}</span
					>
					<span
						v-if="character.rarity == 4"
						class="text-purple-600 dark:text-purple-300"
						>{{ character.title }}</span
					>
					<span
						v-if="character.rarity == 5"
						class="text-yellow-600 dark:text-yellow-300"
						>{{ character.title }}</span
					>
				</template>
			</UInputMenu>
		</div>
		<section v-show="isCharacterNameSet">
			<UDivider label="LEVEL" />
			<div class="">
				<div class="items-center gap-5 grid grid-cols-4">
					<span>Current Level</span>
					<USelect
						:options="levelItems"
						option-attribute="label"
						value-attribue="value"
						v-model="character['char_current_level']"
						:model-value="character['char_current_level'] || 1"
						@change="upsertPlannedCharacter()"
					/>
					<span>Target Level</span>
					<USelect
						:options="levelItems"
						option-attribute="label"
						value-attribue="value"
						v-model="character['char_target_level']"
						:model-value="character['char_target_level'] || 1"
						@change="upsertPlannedCharacter()"
					/>
				</div>
			</div>

			<UDivider label="SKILLS" />
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
								@change="upsertPlannedCharacter()"
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
								@change="upsertPlannedCharacter()"
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
									<UToggle
										color="primary"
										v-model="character[passiveSkill.model_value]"
										:model-value="character[passiveSkill.model_value]"
										@change="upsertPlannedCharacter()"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<UDivider label="MATERIAL NEEDED" />
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
				<div class="flex flex-wrap gap-x-2">
					<div class="" v-for="(item, index) in materials" :key="item.key">
						<InventoryItemMaterialCard
							:index="index"
							:item="item"
							:key="item.key"
							@update-material-count="doEmit"
						>
						</InventoryItemMaterialCard>
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

const characterList = () => {
	let list = [];
	useForEach(characters, (character, characterName) => {
		let subtitle =
			' (' + character.rarity + '⭐ ' + useCapitalize(character.weapon) + ')';
		list = useConcat(list, {
			id: characterName,
			label: character.display_name,
			avatar: { src: character.icon },
			title: character.display_name + ' ' + subtitle,
			value: characterName,
			type: character.weapon,
			rarity: character.rarity,
		});
	});
	list = useOrderBy(list, ['type', 'rarity', 'label'], ['asc', 'asc', 'asc']);
	return list;
};

const characterName = ref('');
const isCharacterNameSet = computed(() => {
	return !!characterName.value;
});
let characterOption = ref({});

const character = ref({ ...dbPlannedCharacter.character });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedCharacter(characterName.value);
};

const getOrInitCharacterName = async (characterOption) => {
	await navigateTo({ hash: '#' + characterOption.value });
};

const getOrInitPlannedCharacter = (characterName) => {
	character.value = usePlannedCharacterStore().getOrInitEntry(characterName);
	character.value['name'] = characterName;

	materials.value = getNeededMaterials(characterName);
};

const toast = useToast();

const upsertPlannedCharacter = () => {
	useDebounceFn(() => {
		if (!characterName.value) {
			return;
		}
		usePlannedCharacterStore().upsert(
			character.value['name'],
			useOmit(character.value, 'name')
		);
	}, 100)().then(() => {
		if (!characterName.value) {
			return;
		}
		toast.add({
			title:
				'Character ' +
				characters[characterName.value].display_name +
				' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			timeout: 2000,
		});
		materials.value = getNeededMaterials(characterName.value);
	});
};

const getNeededMaterials = (characterName) => {
	let neededMaterials =
		characterService.getCharacterNeededMaterials(characterName);
	let ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	return ownedNeededMaterialsResponseData;
};

const setDone = () => {
	useDebounceFn(() => {
		plannerService.setCharacterDone(character.value, materials.value);
	}, 100)().then(() => {
		getOrInitPlannedCharacter(characterName.value);
	});
};

const route = useRoute();

onBeforeMount(() => {
	usePlannedCharacterStore().init();

	// get character name from url hash
	let urlHash = route.hash.slice(1);

	if (urlHash !== undefined && useHas(characters, urlHash)) {
		characterOption = useFind(characterList(), ['value', urlHash]);
		characterName.value = urlHash;
		getOrInitPlannedCharacter(characterName.value);
	} else {
		characterOption = {};
		characterName.value = '';
	}
});

watch(
	() => route.hash,
	() => {
		let urlHash = route.hash.slice(1);

		if (urlHash !== undefined && useHas(characters, urlHash)) {
			characterOption = useFind(characterList(), ['value', urlHash]);
			characterName.value = urlHash;
			getOrInitPlannedCharacter(characterName.value);
		} else {
			characterOption = {};
			characterName.value = '';
		}
	}
);
</script>
