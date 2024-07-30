<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section class="grid grid-cols-1">
		<div>
			<div class="font-bold">Backup Data</div>
			<div class="text-2xl font-extrabold mb-2">
				<UButton color="primary" variant="solid" @click="downloadData">
					Download JSON Data
				</UButton>
			</div>
		</div>
		<div>
			<div class="font-bold">Restore Data</div>
			<div class="text-2xl font-extrabold mb-2">
				<div>TODO</div>
				<UInput type="file" accept=".json" icon="i-heroicons-arrow-up-tray" />
			</div>
		</div>
	</section>
</template>

<script setup>
import * as plannerService from '@/services/plannerService';
const downloadData = () => {
	plannerService.downloadData();
};
</script>
