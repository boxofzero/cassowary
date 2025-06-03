<template>
	<UAccordion
		:ref="templateRef"
		type="multiple"
		:items="accordionItems"
		v-model="accordionActives"
	>
		<template v-for="(value, key) in accordionTemplates" #[key]="{ item }">
			<component :is="value.component" />
		</template>
	</UAccordion>
</template>

<script setup>
/*
accordionTemplates
set key and resolveComponent for each item for accordion
this is only needed for this page, not every accordion
case by case

 in the future maybe move label to i18n

IMPORTANT: resolveComponent needs to happen on vue files,
 should not on composables
*/
let accordionTemplates = {
	welcome: {
		component: resolveComponent('HomeWelcome'),
		label: 'Welcome To Cassowary!',
	},
	stamina: {
		component: resolveComponent('Stamina'),
		label: 'Stamina Tracker',
	},
	notes: {
		component: resolveComponent('Notes'),
		label: 'Notes',
	},
	planned_items: {
		component: resolveComponent('PlannedItems'),
		label: 'Planned Characters & Weapons',
	},
	needed_materials: {
		component: resolveComponent('AllNeededMaterials'),
		label: 'Needed Materials',
	},
};
const accordionDefaultOrder = Object.keys(accordionTemplates);
// init variables
const accordionGroupKey = 'index_page';
let templateRef = 'homeAccordion';
let accordionItems = ref([]);
let accordionActives = ref([]);

// init default values
// accordionItems tell accordion what the content would be
accordionDefaultOrder.forEach((item) => {
	accordionItems.value.push({
		label: accordionTemplates[item].label,
		slot: item,
		value: item,
		ui: {
			label: 'font-extrabold text-4xl',
		},
	});
});
// accordionActive tell accordion which items to open
accordionActives.value = accordionDefaultOrder.slice(0, 2);

// composable
({ accordionItems, accordionActives } = useAccordion(
	templateRef,
	accordionGroupKey,
	accordionItems,
	accordionActives
));
</script>
