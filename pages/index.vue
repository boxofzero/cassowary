<template>
	<UAccordion
		@open="handleChange($event, true)"
		@close="handleChange($event, false)"
		:items="accordionItems"
		:ui="{ item: { color: '' } }"
		multiple
	>
		<template #default="{ item, index, open }">
			<UButton
				color="gray"
				variant="ghost"
				class="border-gray-700 mb-1 border-b"
				:ui="{ rounded: 'rounded-none', padding: { sm: 'p-3 pl-0' } }"
			>
				<template #leading>
					<!-- <div class="flex justify-center items-center bg-primary-500 dark:bg-primary-400 -my-1 rounded-full w-6 h-6">
						<UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
					</div> -->
				</template>

				<span class="font-extrabold text-4xl">{{ item.label }}</span>

				<template #trailing>
					<UIcon
						name="i-heroicons-chevron-right-20-solid"
						class="w-5 h-5 transform transition-transform duration-200 ms-auto"
						:class="[open && 'rotate-90']"
					/>
				</template>
			</UButton>
		</template>

		<template #welcome>
			<!-- Stamina section -->
			<Welcome />
		</template>

		<template #stamina>
			<!-- Stamina section -->
			<Stamina />
		</template>

		<template #notes>
			<!-- Notes section -->
			<Notes />
		</template>

		<template #planned_items>
			<!-- Planned section -->
			<PlannedItems />
		</template>

		<template #needed_materials>
			<!-- Needed materials section -->
			<AllNeededMaterials />
		</template>
	</UAccordion>
</template>

<script setup>
import { useAccordionStore } from '@/stores/accordionStore';

const accordionGroupKey = 'index_page';

let accordionItems = ref([]);

onBeforeMount(() => {
	useAccordionStore().init();
	let accordionGroupData = useAccordionStore().getGroup(accordionGroupKey);

	accordionItems.value = [
		{
			label: 'Welcome To Cassowary!',
			icon: 'i-heroicons-information-circle',
			defaultOpen: useGet(accordionGroupData, 'welcome.open', true),
			slot: 'welcome',
		},
		{
			label: 'Stamina Tracker',
			icon: 'i-heroicons-information-circle',
			defaultOpen: useGet(accordionGroupData, 'stamina.open', true),
			slot: 'stamina',
		},
		{
			label: 'Notes',
			icon: 'i-heroicons-arrow-down-tray',
			defaultOpen: useGet(accordionGroupData, 'notes.open', false),
			slot: 'notes',
		},
		{
			label: 'Planned Characters & Weapons',
			icon: 'i-heroicons-arrow-down-tray',
			defaultOpen: useGet(accordionGroupData, 'planned_items.open', true),
			slot: 'planned_items',
		},
		{
			label: 'Needed Materials',
			icon: 'i-heroicons-arrow-down-tray',
			defaultOpen: useGet(accordionGroupData, 'needed_materials.open', true),
			slot: 'needed_materials',
		},
	];
});

function handleChange(index, status) {
	let accordionItem = accordionItems.value[index];
	let accordionDbData = {
		group_key: accordionGroupKey,
		index_key: accordionItem.slot,
		index_position: parseInt(index),
		open: status,
	};
	useAccordionStore().upsert(accordionDbData);
}
</script>
