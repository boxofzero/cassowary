<template>
	<section class="">
		<h1 class="">Planner</h1>
	</section>
	<!--
	 this will show
	 - to do list daily text-based
	 - planned inventories
	 - planned character
	 - planned weapon
	 -->
</template>

<script setup>
import { useInventoryStore } from '@/stores/inventories';

const loading = false;
const inventoryStore = useInventoryStore();

onBeforeMount(() => {
	if (!process.client) return;

	inventoryStore.initAllInventories();
});
</script>
