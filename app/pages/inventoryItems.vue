<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Inventory</h1>
	</section>

	<section>
		<UAccordion
			:ref="templateRef"
			type="multiple"
			:items="accordionItems"
			v-model="accordionActives"
		>
			<template
				v-for="(materialTypeData, materialType) in accordionTemplates()"
				#[materialType]="{ item }"
			>
				<!-- outer div of each item -->
				<div
					class="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 m-1"
				>
					<div
						v-for="(item2, index) in materialTypeData['items']"
						:key="index"
						class=""
					>
						<!-- <span>item2 {{ JSON.stringify(item2) }}</span
						><br />
						<span>index {{ JSON.stringify(index) }}</span
						><br />
						<span
							>allMaterialsResponseData
							{{ JSON.stringify(allMaterialsResponseData) }}</span
						><br />
						-->

						<InventoryItemMaterialCard
							:index="index"
							:item="allMaterialsResponseData[index]"
							:key="index"
							@update-material-count="doEmit"
						></InventoryItemMaterialCard>
					</div>
				</div>
			</template>
		</UAccordion>
	</section>
</template>

<script setup>
import { useAccordionStore } from '@/stores/accordionStore';
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as inventoryService from '@/services/inventoryService';
import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';
import * as stringHelper from '@/libraries/stringHelper';

const materialLabel = (text) => {
	if (
		gameInventoryItem.categorizedInventoryItems[text]['label'] === undefined
	) {
		return stringHelper.startCase(text.replaceAll('_', ' '));
	}

	return gameInventoryItem.categorizedInventoryItems[text]['label'];
};

let accordionTemplates = () => {
	let data = gameInventoryItem.categorizedInventoryItems;
	let out = {};
	for (let key in data) {
		out[key] = {
			label: key,
			slot: key,
			items: data[key]['items'],
		};
	}
	return out;
};

const accordionDefaultOrder = Object.keys(accordionTemplates());

const accordionGroupKey = 'inventory_item_page';
let templateRef = 'inventoryItemsAccordion';
let accordionItems = ref([]);
let accordionActives = ref([]);

accordionDefaultOrder.forEach((materialType) => {
	accordionItems.value.push({
		label: materialLabel(materialType),
		slot: materialType,
		value: materialType,
		ui: {
			label: 'my-2 font-bold text-2xl',
		},
	});
});

// composable
({ accordionItems, accordionActives } = useAccordion(
	templateRef,
	accordionGroupKey,
	accordionItems,
	accordionActives
));

let accordionGroupData = [];

let allMaterialsResponseData = ref({});

onBeforeMount(() => {
	updateAllMaterial();
});

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
</script>
