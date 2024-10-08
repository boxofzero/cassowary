<template>
	<UCard class="w-28" :ui="{
		header: {
			base: 'flex justify-center',
			padding: 'p-0 sm:p-0',
		},
		body: {
			base: 'flex justify-center',
			padding: 'p-0 sm:p-0',
		},
		footer: {
			base: '',
			padding: 'p-0 sm:p-0',
		},
	}">
		<!-- <Placeholder class="h-32" /> -->
		<div class="flex flex-col items-center">
			<div class="relative">
				<img class="border-gray-800 border-b size-24" :src="(item && item.icon) || ''" />
				<div class="bottom-0 absolute inset-x-0 flex flex-wrap justify-between gap-1 opacity-75 mb-2">
					<UBadge size="xs" :color="ownedItemColor" variant="solid">
						<UIcon name="mdi:target" class="mr-2" />
						<p class="truncate">
							{{ (item && item.needed) || 0 }}
						</p>
					</UBadge>
					<UBadge size="xs" color="yellow" variant="solid" v-if="item && item.synthesized > 0">
						<UIcon name="i-heroicons-beaker" class="mr-2" />
						{{ item && item.synthesized }}
					</UBadge>
				</div>
			</div>
			<div class="flex justify-center h-16 align-middle">
				<span class="text-center text-sm place-self-center">
					{{ (item && item.label) || '' }}
				</span>
			</div>
		</div>

		<template #footer>
			<!-- <Placeholder class="h-8" /> -->
			<div class="h-8">
				<UInput type="number" min="0" v-model="itemRef" @change="updateMaterialCount(index, itemRef)" />
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
	if (props.item && props.item.needed === 0) return 'white';
	return props.item && synthesizedOwned >= props.item.needed ? 'green' : 'red';
});

const toast = useToast();
const itemRef = ref(0);

const updateMaterialCount = (index, count) => {
	debouncedUpdateMaterialCount(index, count).then(() => {
		toast.add({
			title: 'Inventory Item ' + props.item.label + ' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			timeout: 2000,
		});
		$emit('updateMaterialCount', true);
	});
};

const debouncedUpdateMaterialCount = useDebounceFn((index, count) => {
	useInventoryItemStore().updateInventory(index, count);
	itemRef.value = count;
}, 1000);

onMounted(() => {
	itemRef.value = (props.item && props.item.owned) || 0;
});
</script>
