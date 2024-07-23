<template>
	<v-card class="w-full">
		<!-- <v-img :src="(item && item.icon) || ''"></v-img> -->
		<div class="relative">
			<v-img
				class=""
				v-show="isImageLoaded"
				@load="imageLoaded()"
				:src="(item && item.icon) || ''"
			></v-img>
			<v-skeleton-loader
				class=""
				v-show="!isImageLoaded"
				boilerplate
				type="image"
			></v-skeleton-loader>
			<v-card-text class="pa-0">
				<div
					class="absolute inset-x-0 bottom-0 grid grid-cols-1"
					v-if="item && item.needed > 0"
				>
					<v-chip
						density="compact"
						class=""
						:color="ownedItemColor"
						prepend-icon="mdi mdi-target"
					>
						{{ (item && item.needed) || 0 }}
					</v-chip>
					<v-chip
						density="compact"
						class=""
						color="yellow"
						prepend-icon="mdi mdi-check"
					>
						0
						<!-- TODO
					 this is for number of item that can be synthesized from lower tier
					  -->
					</v-chip>
				</div>
			</v-card-text>
		</div>
		<v-card-text class="h-16 pa-0 content-center text-center">
			{{ materialLabel }}
		</v-card-text>
		<!-- label="material owned count" -->
		<v-text-field
			hide-details="true"
			hide-spin-buttons="true"
			density="compact"
			class="text-center"
			type="number"
			:min="0"
			:max="999_999_999"
			v-model.lazy="itemRef"
			:model-value="itemRef"
			@update:modelValue="debouncedUpdateMaterialCount(index, $event)"
		></v-text-field>
	</v-card>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';
import { useTitle } from '@vueuse/core';

const $emit = defineEmits(['updateMaterialCount']);

const props = defineProps({
	index: String,
	item: Object,
});

const isImageLoaded = ref(false);
function imageLoaded() {
	isImageLoaded.value = true;
}

const materialLabel = computed(() => {
	return useStartCase(props.index.replaceAll('_', ' '));
});

const ownedItemColor = computed(() => {
	return props.item && itemRef.value >= props.item.needed ? 'green' : 'red';
});

const itemRef = ref(0);
const debouncedUpdateMaterialCount = useDebounceFn((index, count) => {
	useInventoryItemStore()
		.updateInventory(index, count)
		.then(() => {
			itemRef.value = count;
			$emit('updateMaterialCount', true);
		});
}, 1000);

onMounted(() => {
	itemRef.value = (props.item && props.item.owned) || 0;
});
</script>
