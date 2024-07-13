<template>
	<section class="">
		<h1 class="">Characters</h1>
	</section>
	<!--
		add button to add other characters

		TODO filter but it's not in 1.0

		show list of planned characters
		if the character is in planned characters and active, show normal (color)
		if the character is in planned but inacvite, show grayscale
		-->
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';

const loading = false;
const inventoryItemStore = useInventoryItemStore();

onBeforeMount(() => {
	if (!process.client) return;

	// inventoryItemStore.initInventories();
});
</script>
