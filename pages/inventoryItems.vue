<template>
	<section class="flex items-center justify-between mb-5">
		<h1 class="text-4xl font-extrabold">Inventory</h1>
	</section>
	<div
		v-for="(
			materialTypeData, materialType
		) in gameInventoryItem.categorizedInventoryItems"
		:key="materialType"
	>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white my-5">
			{{ materialLabel(materialType) }}
		</h2>
		<!-- outer div of each item -->
		<div class="grid grid-cols-8 gap-1">
			<div v-for="(item, index) in materialTypeData" :key="index" class="">
				<InventoryItemMaterialCard
					:index="index"
					:item="allMaterialsResponseData[index]"
					:key="index"
					@update-material-count="doEmit"
				></InventoryItemMaterialCard>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItemStore';
import * as inventoryService from '@/services/inventoryService';
import * as gameInventoryItem from '~/data/game/inventoryItem/gameInventoryItem';

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
});
</script>
