<template>
	<section>
		<div class="flex flex-wrap gap-2 px-4">
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
					<div class="flex flex-wrap gap-x-2">
						<div
							v-for="item2 in filterNeededMaterials(
								materialTypeData['items'],
								allMaterialsResponseData
							)"
							:key="item2"
							class=""
						>
							<InventoryItemMaterialCard
								:index="materialType"
								:item="allMaterialsResponseData[item2]"
								:key="materialType"
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
import * as stringHelper from '@/libraries/stringHelper';
import * as objectHelper from '@/libraries/objectHelper';

const materialLabel = (text) => {
	if (
		gameInventoryItem.categorizedInventoryItems[text]['label'] === undefined
	) {
		return stringHelper.startCase(text.replaceAll('_', ' '));
	}

	return gameInventoryItem.categorizedInventoryItems[text]['label'];
};

let allMaterialsResponseData = ref({});

let accordionTemplates = () => {
	let data = gameInventoryItem.charWeaponOnlyCategorizedInventoryItems;
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

const accordionGroupKey = 'all_needed_materials_index_page';
let templateRef = 'allNeededMaterialsAccordion';
let accordionItems = ref([]);
let accordionActives = ref([]);

accordionDefaultOrder.forEach((materialType) => {
	accordionItems.value.push({
		label: materialLabel(materialType),
		slot: materialType,
		value: materialType,
	});
});

// composable
({ accordionItems, accordionActives } = useAccordion(
	templateRef,
	accordionGroupKey,
	accordionItems,
	accordionActives
));

function filterNeededMaterials(listArray, neededArray) {
	let out = Object.keys(listArray).filter(function (item) {
		return neededArray[item];
	});
	return out;
}

onBeforeMount(() => {
	useInventoryItemStore().init();
	updateAllMaterial();
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	updateAllMaterial();
};

const updateAllMaterial = () => {
	let responseData = inventoryService.getAllMaterialsResponseData();
	allMaterialsResponseData.value = objectHelper.pickBy(
		responseData,
		(materialData, materialType) => {
			if (
				Object.keys(gameInventoryItem.synthesizable_materials).includes(
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
