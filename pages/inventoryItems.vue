<template>
	<section class="flex items-center justify-between mb-5">
		<h1 class="text-4xl font-extrabold">Inventory</h1>
	</section>

	<section>
		<UAccordion multiple :items="accordionItems" :ui="{ item: { color: '' } }">
			<template #default="{ item, index, open }">
				<UButton color="gray" variant="ghost" class="border-gray-200 dark:border-gray-700 border-b"
					:ui="{ rounded: 'rounded-none', padding: { sm: 'p-3 pl-0 py-0' } }">
					<template #leading></template>

					<span class="text-2xl font-bold my-2">{{ item.label }}</span>

					<template #trailing>
						<UIcon name="i-heroicons-chevron-right-20-solid"
							class="w-5 h-5 transform transition-transform duration-200 ms-auto" :class="[open && 'rotate-90']" />
					</template>
				</UButton>
			</template>

			<template v-for="(
				materialTypeData, materialType
			) in gameInventoryItem.categorizedInventoryItems" :key="materialType" #[`${materialType}`]>
				<!-- outer div of each item -->
				<div class="grid grid-cols-8 gap-1 p-3">
					<div v-for="(item, index) in materialTypeData" :key="index" class="">
						<InventoryItemMaterialCard :index="index" :item="allMaterialsResponseData[index]" :key="index"
							@update-material-count="doEmit"></InventoryItemMaterialCard>
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

const accordionItems = []

const generateAccordionInventoryItems = () => {
	for (let materialType in gameInventoryItem.categorizedInventoryItems) {
		accordionItems.push({
			label: materialLabel(materialType),
			defaultOpen: false,
			slot: materialType
		});
	}
}

const allMaterialsResponseData = ref({});

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

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();

	generateAccordionInventoryItems();
});
</script>
