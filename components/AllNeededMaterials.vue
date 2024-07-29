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
					:index="index.toString()"
					:item="item"
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

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();
});
</script>
