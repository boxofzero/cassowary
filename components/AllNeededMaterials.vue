<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Needed Materials</h1>
	</section>

	<section>
		<div class="grid grid-cols-8 gap-1">
			<div
				v-for="(item, index) in allMaterialsResponseData"
				:key="index"
				class=""
			>
				<InventoryItemMaterialCard
					:index="index"
					:item="allMaterialsResponseData[index]"
					:key="index"
					@update-material-count="doEmit"
				></InventoryItemMaterialCard>
			</div>
		</div>
	</section>
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
	allMaterialsResponseData.value = useFilter(
		inventoryService.getAllMaterialsResponseData(),
		(material) => {
			return material.needed > 0;
		}
	);
};

const materialLabel = (text) => {
	return useStartCase(text.replaceAll('_', ' '));
};

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();
});
</script>
