<template>
	<section class="">
		<h1 class="">Inventories</h1>
	</section>
	<div
		v-for="(
			materialTypeData, materialType
		) in gameInventoryItems.categorizedInventoryItems"
		:key="materialType"
	>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white">
			{{ materialType }}
		</h2>
		<!-- outer div of each item -->
		<div class="grid grid-cols-6 gap-6">
			<div v-for="(item, index) in materialTypeData" :key="index" class="">
				<InventoryItemMaterialCard
					:index="index"
					:item="allMaterialsResponseData[index]"
				></InventoryItemMaterialCard>
				<!-- div for per stuff -->
				<!-- <div class="">
					<v-number-input
						:label="stuffKey"
						control-variant="stacked"
						inset
						density="compact"
						:min="0"
						:max="99999"
						:model-value="stuffValue['count']"
						v-model="inventoryItemStore.get(itemType, stuffKey)['count']"
						@update:modelValue="
							inventoryItemStore.updateInventory(itemType, stuffKey, $event)
						"
					></v-number-input>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';
import * as inventoryService from '@/services/inventoryService';
import * as gameInventoryItems from '~/data/game/gameInventoryItems';

const allMaterialsResponseData = ref({});

const updateAllMaterial = () => {
	allMaterialsResponseData.value =
		inventoryService.getAllMaterialsResponseData();
};

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();
});
</script>
