<template>
	<v-card class="w-full">
		<!-- <v-img :src="(item && item.icon) || ''"></v-img> -->
		<v-img
			v-show="isImageLoaded"
			@load="imageLoaded()"
			:src="(item && item.icon) || ''"
		></v-img>
		<v-skeleton-loader
			v-show="!isImageLoaded"
			boilerplate
			type="image"
		></v-skeleton-loader>

		<v-card-text class="h-16 pa-0 content-center text-center">{{
			index
		}}</v-card-text>
		<v-card-text class="pa-0">
			<div class="grid grid-cols-1">
				<v-chip
					density="compact"
					class=""
					color="yellow"
					prepend-icon="mdi mdi-target"
				>
					{{ (item && item.needed) || 0 }}
				</v-chip>
				<v-chip
					density="compact"
					class=""
					color="green"
					prepend-icon="mdi mdi-check"
				>
					0
				</v-chip>
			</div>
		</v-card-text>
		<!-- label="material owned count" -->
		<v-text-field
			class="text-center"
			type="number"
			:model-value="(item && item.owned) || 0"
			@update:modelValue="updateMaterialCount(index, $event)"
		></v-text-field>
	</v-card>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';

const $emit = defineEmits(['updateMaterialCount']);

const props = defineProps({
	index: String,
	item: Object,
});
const isImageLoaded = ref(false);

function imageLoaded() {
	isImageLoaded.value = true;
}

const updateMaterialCount = (index, count) => {
	useInventoryItemStore()
		.updateInventory(index, count)
		.then(() => {
			$emit('updateMaterialCount', true);
		});
};
</script>
