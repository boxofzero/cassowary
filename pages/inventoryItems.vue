<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Inventory</h1>
	</section>

	<section>
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

					<span class="my-2 font-bold text-2xl">{{ item.label }}</span>

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
				v-for="(
					materialTypeData, materialType
				) in gameInventoryItem.categorizedInventoryItems"
				:key="materialType"
				#[`${materialType}`]
			>
				<!-- outer div of each item -->
				<div class="gap-1 grid grid-cols-8 p-3">
					<div v-for="(item, index) in materialTypeData" :key="index" class="">
						<InventoryItemMaterialCard
							:index="index"
							:item="allMaterialsResponseData[index]"
							:key="index"
							@update-material-count="doEmit"
						></InventoryItemMaterialCard>
					</div>
				</div>
			</template>

			<template #stamina>
				<!-- Stamina section -->
				<Stamina />
			</template>
		</UAccordion>
	</section>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as inventoryService from '@/services/inventoryService';
import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';

const accordionGroupKey = 'inventory_item_page';

let accordionItems = ref([]);
let accordionGroupData = [];

let allMaterialsResponseData = ref({});

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
	for (let materialType in gameInventoryItem.categorizedInventoryItems) {
		accordionItems.value.push({
			label: materialLabel(materialType),
			defaultOpen: useGet(accordionGroupData, materialType + '.open', false),
			slot: materialType,
		});
	}
};

const doEmit = (a) => {
	console.log('emit received: ' + a);
	updateAllMaterial();
};

const updateAllMaterial = () => {
	allMaterialsResponseData.value =
		inventoryService.getAllMaterialsResponseData();
};

const materialLabel = (text) => {
	return useStartCase(text.replaceAll('_', ' '));
};
</script>
