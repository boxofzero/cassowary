<template>
	<UCard
		:class="
			'w-28 ' +
			(item && item.missing === 0 ? 'opacity-40 hover:opacity-100' : '')
		"
		:ui="{
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
		}"
	>
		<div class="flex flex-col items-center">
			<div class="flex justify-center p-1 h-12 align-middle">
				<span class="text-center text-xs place-self-center">
					{{ (item && item.label) || '' }}
				</span>
			</div>
			<div class="relative">
				<img
					class="border-gray-800 border-b size-24"
					:src="(item && item.icon) || ''"
				/>
				<!-- Overlay for missing and syntesizable -->
				<div
					class="absolute inset-y-0 flex flex-col-reverse justify-between opacity-75 my-2"
				>
					<!-- Missing/Completed count badge and tooltip -->
					<UTooltip
						:text="item && item.missing > 0 ? 'Missing' : 'Completed'"
						:popper="{ placement: 'right' }"
						class=""
					>
						<UBadge
							size="xs"
							:color="ownedItemColor"
							variant="solid"
							class="flex justify-center"
						>
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
						:popper="{ placement: 'left' }"
						v-if="item && item.synthesized > 0"
					>
						<UBadge size="xs" color="yellow" variant="solid">
							<UIcon name="ic:outline-science" class="mr-2" />
							{{ item && item.synthesized }}
						</UBadge>
					</UTooltip>
				</div>
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
