<template>
	<section class="mb-5 flex items-center justify-between">
		<h1 class="text-4xl font-extrabold">Characters</h1>
	</section>
	<section>
		<div class="flex flex-wrap items-center gap-5">
			<h2>CHARACTER NAME</h2>
			<UInputMenu searchable searchable-placeholder="Select character" class="w-full lg:w-48"
				placeholder="Select character" v-model="characterOption" :options="characterList()" option-attribute="title"
				value-attribue="value" :search-attributes="['title', 'subtitle']" @change="getOrInitNuxtUi($event)" size="xl">
				<template #leading>
					<UAvatar v-bind="characterOption.avatar" size="2xs" />
				</template>
			</UInputMenu>
		</div>
		<section v-show="isCharacterNameSet">
			<UDivider label="LEVEL" />
			<div class="">
				<div class="grid grid-cols-4 items-center gap-5">
					<span>Current Level</span>
					<USelect :options="levelItems" option-attribute="label" value-attribue="value"
						v-model="character['char_current_level']" :model-value="character['char_current_level'] || 1"
						@change="upsertPlannedCharacter()" />
					<span>Target Level</span>
					<USelect :options="levelItems" option-attribute="label" value-attribue="value"
						v-model="character['char_target_level']" :model-value="character['char_target_level'] || 1"
						@change="upsertPlannedCharacter()" />
				</div>
			</div>

			<UDivider label="SKILLS" />
			<div class="flex flex-row gap-2">
				<div class="basis-3/5 border-r border-solid border-gray-800 p-1">
					<h2>ACTIVE SKILLS</h2>
					<div v-for="(item, index) in activeSkills" :key="index">
						<div class="grid auto-cols-max grid-flow-col grid-cols-5 gap-2">
							<span class="col-span-2">{{ item.label }}:</span>
							<label>Current Level</label>
							<UInput type="number" :min="1" :max="10" v-model="character[item.model_value + '_current_level']"
								:model-value="character[item.model_value + '_current_level'] || 1
									" @change="upsertPlannedCharacter()" />
							<label>Target Level</label>
							<UInput type="number" :min="1" :max="10" v-model="character[item.model_value + '_target_level']"
								:model-value="character[item.model_value + '_target_level'] || 1
									" @change="upsertPlannedCharacter()" />
							<!-- </div> -->
						</div>
					</div>
				</div>
				<div class="basis-2/5 p-1">
					<h2>PASSIVE SKILLS</h2>
					<div class="flex flex-row gap-2 justify-between items-center">
						<div v-for="(item, index) in passiveSkills" :key="index" class="w-full">
							<div class="" v-for="passiveSkill of item.data" :key="passiveSkill.model_value">
								<div class="grid auto-cols-max grid-flow-col grid-cols-2 gap-2 items-center">
									<label class="col-span-2">{{ item.label }} {{ passiveSkill.label }}</label>
									<UToggle color="primary" v-model="character[passiveSkill.model_value]"
										:model-value="character[passiveSkill.model_value]" @change="upsertPlannedCharacter()" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<UDivider label="MATERIAL NEEDED" />
			<section class="p-3">
				<UButton class="mr-3" color="primary" variant="solid" @click="setDone" :disabled="!isMaterialsExist">
					Done
				</UButton>
				<span class="inline-block align-middle">
					Press "DONE" to set the current level/skill to the target value and
					adjust the inventory item count
				</span>
			</section>
			<section>
				<div class="grid grid-cols-6 gap-6">
					<div class="" v-for="(item, index) in materials" :key="item.key">
						<InventoryItemMaterialCard :index="index" :item="item" :key="item.key" @update-material-count="doEmit">
						</InventoryItemMaterialCard>
					</div>
				</div>
			</section>
		</section>
	</section>
</template>

<script setup>
import { characters } from "~/data/game/gameCharacter";
import * as dbPlannedCharacter from "~/data/database/dbPlannedCharacter";
import {
	levelItems,
	activeSkills,
	passiveSkills,
} from "~/data/form/characters/formCharactersNew";
import { usePlannedCharacterStore } from "@/stores/plannedCharacterStore";
import * as characterService from "@/services/characterService";
import * as inventoryService from "@/services/inventoryService";
import * as plannerService from "@/services/plannerService";

const characterList = () => {
	let list = [];
	useForEach(characters, (character, characterName) => {
		const subtitle = character.rarity + "⭐";
		list = useConcat(list, {
			id: characterName,
			label: character.display_name,
			avatar: { src: character.icon },
			title: character.display_name,
			value: characterName,
			subtitle: subtitle,
		});
	});
	list = useOrderBy(list, ["title"], ["asc"]);
	return list;
};

const characterName = ref("");
const isCharacterNameSet = computed(() => {
	return !!characterName.value;
});
const characterOption = ref({});

const character = ref({ ...dbPlannedCharacter.character });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log("emit received: " + a);
	getOrInitPlannedCharacter(characterName.value);
};

const getOrInitNuxtUi = (characterOption) => {
	console.log("characterOption: " + JSON.stringify(characterOption));
	characterName.value = characterOption.value;
	getOrInitPlannedCharacter(characterOption.value);
};

const getOrInitPlannedCharacter = (characterName) => {
	character.value = usePlannedCharacterStore().getOrInitEntry(characterName);
	character.value["name"] = characterName;

	materials.value = getNeededMaterials(characterName);
};

const toast = useToast();

const upsertPlannedCharacter = () => {
	useDebounceFn(() => {
		if (!characterName.value) {
			return;
		}
		usePlannedCharacterStore().upsert(
			character.value["name"],
			useOmit(character.value, "name")
		);
	}, 100)().then(() => {
		if (!characterName.value) {
			return;
		}
		toast.add({
			title:
				"Character " +
				characters[characterName.value].display_name +
				" updated to LocalStorage",
			icon: "i-heroicons-check-badge",
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
		characterName.value = urlHash;
		getOrInitPlannedCharacter(characterName.value);
	}
});
</script>
