<template>
	<UCard>
		<template #header>
			<!-- <Placeholder class="h-8" /> -->
			<div class="h-8">
				<UBadge
					color="yellow"
					variant="solid"
					icon="i-heroicons-beaker"
					v-if="item && item.synthesized > 0"
				>
					<UIcon name="i-heroicons-beaker" />
					{{ item && item.synthesized }}
				</UBadge>
				<UBadge :color="ownedItemColor" variant="solid">
					<UIcon name="i-heroicons-viewfinder-circle" />
					{{ (item && item.needed) || 0 }}
				</UBadge>
			</div>
		</template>

		<!-- <Placeholder class="h-32" /> -->
		<img class="h-32" :src="(item && item.icon) || ''" />
		<span class="h-8">
			{{ (item && item.label) || '' }}
		</span>

		<template #footer>
			<!-- <Placeholder class="h-8" /> -->
			<div class="h-8">
				<UInput
					type="number"
					v-model="itemRef"
					@blur="updateMaterialCount(index, itemRef)"
				/>
			</div>
		</template>
	</UCard>
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
