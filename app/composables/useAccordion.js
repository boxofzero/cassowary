import { useAccordionStore } from '@/stores/accordionStore';
import { useSortable } from '@vueuse/integrations/useSortable';

/*
@function useAccordion
@desc the goal is passing groupKey and data then accordion can just work
@desc dont resolveComponent here

@param templateRef for useSortable
@param accordionGroupKey for key of data

@return sortedAccordionItems

*/
export function useAccordion(
	templateRef,
	accordionGroupKey,
	accordionItems,
	accordionActives
) {
	/*
	init return variables
	[
	{key: 'aaa', active: true},
	{key: 'bbb', active: false},
	]
	*/
	let sortedAccordionItems = [];

	// init sortable
	useSortable(useTemplateRef(templateRef), accordionItems, {
		animation: 150,
	});

	onBeforeMount(() => {
		// get data from storage

		// init accordionStore
		useAccordionStore().init();
		// get data based on groupKey
		let accordionGroupData = useAccordionStore().getGroup(accordionGroupKey);
		// from stored data, this should prepare data for sorted accordion data and each open/active status
		if (accordionGroupData === undefined) {
			// TODO handle if empty?
			return;
		}
		let reoderedAccordionItems = [];
		accordionActives.value = [];
		Object.entries(accordionGroupData).forEach(([key, value], index) => {
			sortedAccordionItems[value.index_position] = {
				key: key,
				open: value.open,
			};
			// set accordionItems value
			// reoder accordionItems
			reoderedAccordionItems[value.index_position] = accordionItems.value.find(
				(item) => {
					return item.slot === key;
				}
			);

			// set accordionActives value
			if (value.open) {
				accordionActives.value.push(key);
			}
		});

		accordionItems.value = reoderedAccordionItems;
	});

	// watcher for accordionActives
	// watcher accordionItems sorting position
	// store data when it changes
	watch(
		[accordionItems, accordionActives],
		([newAccordionItems, newAccordionActives]) => {
			//prepare data for store
			let accordionStoreData = {};
			newAccordionItems.forEach((item, index) => {
				accordionStoreData[item.slot] = {
					index_position: index,
					open: newAccordionActives.includes(item.slot),
				};
			});
			// store data
			useAccordionStore().upsertWholeGroup(
				accordionGroupKey,
				accordionStoreData
			);
		}
	);

	// return what sorted accordion should be with each open/active status
	return {
		accordionItems,
		accordionActives,
	};
}
