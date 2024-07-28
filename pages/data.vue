<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section class="grid grid-cols-1">
		<div>
			<div class="font-bold">Backup Data</div>
			<div class="text-2xl font-extrabold text-white mb-2">
				<v-btn class="mr-5" @click="downloadData">Download JSON Data</v-btn>
			</div>
		</div>
		<div>
			<div class="font-bold">Restore Data</div>
			<div class="text-2xl font-extrabold text-white mb-2">
				<div>TODO</div>
				<v-file-input
					accept=".json"
					label="JSON data"
					placeholder="Upload JSON data"
					prepend-icon="mdi mdi-file-upload"
				></v-file-input>
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
