<template>
	<section class="">
		<h1 class="">Inventories</h1>
	</section>
	<InventoryItemResonatorAscensionBossMaterial
		:loading="loading"
		:inventoryItemStore="inventoryItemStore"
	/>

	<UDivider />

	<InventoryItemSkillUpgradeMaterial
		:loading="loading"
		:inventoryItemStore="inventoryItemStore"
	/>
	<!--  -->
</template>

<script setup>
import { useInventoryItemStore } from '@/stores/inventoryItems';

const loading = false;
const inventoryItemStore = useInventoryItemStore();

onBeforeMount(() => {
	inventoryItemStore.init();
});
</script>
