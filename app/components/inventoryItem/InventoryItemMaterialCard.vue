<template>
	<UCard
		:ui="{
			header: 'p-1 sm:p-1',
			body: 'p-1 sm:p-1',
			footer: 'p-1 sm:p-1',
		}"
		:class="item && item.missing === 0 ? 'opacity-40 hover:opacity-100' : ''"
	>
		<template #header>
			<div
				class="flex justify-center items-center h-20 font-medium text-base text-center break-words"
				:title="(item && item.label) || ''"
			>
				{{ (item && item.label) || '' }}
			</div>
		</template>

		<div class="relative">
			<img
				class="border-gray-800 border-b object-cover"
				:src="(item && item.icon) || ''"
			/>
			<!-- Overlay for missing and syntesizable -->
			<div
				class="absolute inset-y-0 flex flex-col-reverse justify-between opacity-75 my-2"
			>
				<!-- Missing/Completed count badge and tooltip -->
				<UTooltip
					:text="item && item.missing > 0 ? 'Missing' : 'Completed'"
					:content="{
						side: 'right',
					}"
					class=""
				>
					<UBadge size="md" :color="ownedItemColor" variant="solid" class="">
						<UIcon
							name="ic:round-cancel"
							class=""
							v-if="item && item.missing > 0"
						/>
						<UIcon name="ic:round-check-circle-outline" class="" v-else />
						<p class="truncate">
							{{ (item && item.missing) || 0 }}
						</p>
					</UBadge>
				</UTooltip>

				<!-- Syntesizable count badge and tooltip -->
				<UTooltip
					text="Syntesizable"
					:content="{
						side: 'left',
					}"
					v-if="item && item.synthesized > 0"
				>
					<UBadge size="md" color="warning" variant="solid">
						<UIcon name="ic:outline-science" class="" />
						{{ item && item.synthesized }}
					</UBadge>
				</UTooltip>
			</div>
		</div>

		<template #footer>
			<!-- Needed count -->
			<div class="flex justify-center p-1 align-middle">
				<div class="self-center">
					<UTooltip text="Needed" :popper="{ placement: 'top' }">
						<p class="font-bold">
							{{ (item && item.needed) || 0 }}
						</p>
					</UTooltip>
				</div>
			</div>
			<!-- Owned count and user input -->
			<div class="h-8">
				<UTooltip text="Owned" :popper="{ placement: 'bottom' }">
					<UInput
						type="number"
						min="0"
						v-model="itemRef"
						@change="updateMaterialCount(index, itemRef)"
					/>
				</UTooltip>
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
	if (props.item && props.item.needed === 0) return 'neutral';
	return props.item && synthesizedOwned >= props.item.needed
		? 'success'
		: 'error';
});

const toast = useToast();
const itemRef = ref(0);

const updateMaterialCount = (index, count) => {
	debouncedUpdateMaterialCount(index, count).then(() => {
		toast.add({
			title: 'Inventory Item ' + props.item.label + ' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			duration: 2000,
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
