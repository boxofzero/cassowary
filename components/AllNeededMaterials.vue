<template>
	<section>
		<div class="flex flex-wrap gap-2">
			<UAccordion
				multiple
				:items="accordionItems"
				:ui="{ item: { color: '' } }"
				@open="handleAccordionChange($event, true)"
				@close="handleAccordionChange($event, false)"
			>
				<template #default="{ item, index, open }">
					<UButton
						color="gray"
						variant="ghost"
						class="border-gray-200 dark:border-gray-700 border-b"
						:ui="{ rounded: 'rounded-none', padding: { sm: 'p-3 pl-0 py-0' } }"
					>
						<template #leading></template>

						<span class="my-1 text-lg indent-4">{{ item.label }}</span>

						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 transform transition-transform duration-200 ms-auto"
								:class="[open && 'rotate-90']"
							/>
						</template>
					</UButton>
				</template>

				<template
					v-for="(materialTypeData, materialType) in useOmit(
						gameInventoryItem.categorizedInventoryItems,
						['echo_development_material']
					)"
					:key="materialType"
					#[`${materialType}`]
				>
					<!-- outer div of each item -->
					<div class="flex flex-wrap gap-x-2">
						<div
							v-for="item in filterNeededMaterials(
								materialTypeData['items'],
								allMaterialsResponseData
							)"
							:key="item"
							class=""
						>
							<InventoryItemMaterialCard
								:index="item"
								:item="allMaterialsResponseData[item]"
								:key="item"
								@update-material-count="doEmit"
							></InventoryItemMaterialCard>
						</div>
					</div>
				</template>
			</UAccordion>
		</div>
	</section>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as inventoryService from '@/services/inventoryService';
import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';
import { useAccordionStore } from '@/stores/accordionStore';

const accordionGroupKey = 'all_needed_materials_index_page';

let accordionItems = ref([]);
let accordionGroupData = [];

let allMaterialsResponseData = ref({});

function filterNeededMaterials(listArray, neededArray) {
	return useFilter(Object.keys(listArray), function (item) {
		return neededArray[item];
	});
}

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();

	useAccordionStore().init();
	accordionGroupData = useAccordionStore().getGroup(accordionGroupKey);

	generateAccordionInventoryItems();
});

function handleAccordionChange(index, status) {
	let accordionItem = accordionItems.value[index];
	let accordionDbData = {
		group_key: accordionGroupKey,
		index_key: accordionItem.slot,
		index_position: parseInt(index),
		open: status,
	};
	useAccordionStore().upsert(accordionDbData);
}

const generateAccordionInventoryItems = () => {
	for (let materialType in useOmit(
		gameInventoryItem.categorizedInventoryItems,
		['echo_development_material']
	)) {
		accordionItems.value.push({
			label: materialLabel(materialType),
			defaultOpen: useGet(accordionGroupData, materialType + '.open', false),
			slot: materialType,
		});
	}
};

const materialLabel = (text) => {
	if (
		gameInventoryItem.categorizedInventoryItems[text]['label'] === undefined
	) {
		return useStartCase(text.replaceAll('_', ' '));
	}

	return gameInventoryItem.categorizedInventoryItems[text]['label'];
};

const doEmit = (a) => {
	console.log('emit received: ' + a);
	updateAllMaterial();
};

const updateAllMaterial = () => {
	let responseData = inventoryService.getAllMaterialsResponseData();
	allMaterialsResponseData.value = usePickBy(
		responseData,
		(materialData, materialType) => {
			if (
				useKeys(gameInventoryItem.synthesizable_materials).includes(
					materialType
				)
			) {
				let iterableMaterialType = materialType;
				while (iterableMaterialType !== undefined) {
					if (
						responseData[iterableMaterialType] &&
						responseData[iterableMaterialType].needed > 0
					) {
						return true;
					}
					iterableMaterialType =
						gameInventoryItem.synthesizable_materials[iterableMaterialType].to;
				}
			}
			return (
				materialData.needed > 0 ||
				(materialData.synthesized && materialData.synthesized > 0)
			);
		}
	);
};
</script>
