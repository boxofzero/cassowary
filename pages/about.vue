<template>
	<section class="">
		<h1 class="">Planner</h1>
	</section>
	<section>
		<div>
			<span>thanks to wutheringwaves.gg for the data</span>
			<br />
			<span>random trivia</span>
			<br />
			<span>char_exp : credit_to_level = 1 : 0,35</span>
			<br />
			<span
				>weapon_exp : credit_to_level = 1 : 0,4 (allegedly. CMIIW . The
				calculation kinda funky)</span
			>
		</div>
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
	// inventoryItemStore.initInventories();
});
</script>
