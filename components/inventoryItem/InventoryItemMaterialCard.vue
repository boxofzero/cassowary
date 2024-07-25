<template>
	<v-card class="w-full">
		<!-- <v-img :src="(item && item.icon) || ''"></v-img> -->
		<div class="relative">
			<v-img class="" :src="(item && item.icon) || ''"></v-img>
			<v-card-text class="pa-0">
				<div
					class="absolute inset-x-0 bottom-0 grid grid-cols-1"
					v-if="item && item.needed > 0"
				>
					<v-chip
						v-if="item && item.synthesized > 0"
						class=""
						size="small"
						density="compact"
						color="yellow"
						variant="elevated"
						prepend-icon="mdi mdi-flask"
					>
						{{ item && item.synthesized }}
					</v-chip>
					<v-chip
						class=""
						size="small"
						density="compact"
						:color="ownedItemColor"
						variant="elevated"
						prepend-icon="mdi mdi-target"
					>
						{{ (item && item.needed) || 0 }}
					</v-chip>
				</div>
			</v-card-text>
		</div>
		<v-card-text class="h-16 pa-0 content-center text-center">
			{{ (item && item.label) || '' }}
		</v-card-text>
		<!-- label="material owned count" -->
		<v-text-field
			hide-details
			hide-spin-buttons
			density="compact"
			class="text-center"
			type="number"
			:min="0"
			:max="999_999_999"
			v-model="itemRef"
			:model-value="itemRef"
			@update:modelValue="updateMaterialCount(index, itemRef)"
		></v-text-field>
	</v-card>
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItemStore';

const $emit = defineEmits(['updateMaterialCount']);

const props = defineProps({
	index: String,
	item: Object,
});

const ownedItemColor = computed(() => {
	const synthesizedOwned =
		props.item && (props.item.synthesized || 0) + (props.item.owned || 0);
	return props.item && synthesizedOwned >= props.item.needed ? 'green' : 'red';
});

const itemRef = ref(0);
const updateMaterialCount = (index, count) => {
	debouncedUpdateMaterialCount(index, count).then(() => {
		$emit('updateMaterialCount', true);
	});
};

const debouncedUpdateMaterialCount = useDebounceFn((index, count) => {
	useInventoryItemStore().updateInventory(index, count);
	itemRef.value = count;
}, 100);

onMounted(() => {
	itemRef.value = (props.item && props.item.owned) || 0;
});
</script>
