<template>
	<section class="">
		<h1 class="">Inventories</h1>
	</section>
	<div
		v-for="(itemTypeData, itemType) in inventoryItemFormScheme"
		:key="itemType"
	>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white">
			{{ itemType }}
		</h2>
		<!-- outer div of each item -->
		<div class="grid grid-cols-4 gap-4">
			<div
				v-for="(stuffValue, stuffKey) in itemTypeData"
				:key="stuffKey"
				class=""
			>
				<!-- div for per stuff -->
				<div class="">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';
import * as inventoryStructures from '~/libraries/inventoryStructures';

// STORE inventoryItemStore
const inventoryItemStore = useInventoryItemStore();

const inventoryItemFormScheme = ref({ ...inventoryStructures.inventoryItems });

onBeforeMount(() => {
	inventoryItemStore.init();
});
</script>
