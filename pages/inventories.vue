<template>
	<section class="">
		<h1 class="">Inventories</h1>
	</section>
	<InventoryResonatorAscensionBossMaterial
		:loading="loading"
		:inventoryStore="inventoryStore"
	/>

	<UDivider />

	<InventorySkillUpgradeMaterial
		:loading="loading"
		:inventoryStore="inventoryStore"
	/>
	<!--  -->
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
