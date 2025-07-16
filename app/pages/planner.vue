<template>
	<section class="">
		<h1 class="">Planner</h1>
	</section>
	<!--
	 this will show
	 - to do list daily text-based
	 - planned inventoryItems
	 - planned character
	 - planned weapon
	 -->
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItemStore';

const loading = false;
const inventoryItemStore = useInventoryItemStore();

onBeforeMount(() => {
	if (!process.client) return;

	// inventoryItemStore.initInventories();
});
</script>
