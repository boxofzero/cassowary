<template>
	<section class="flex justify-between items-center mb-10">
		<h1 class="font-extrabold text-4xl">Settings</h1>
	</section>

	<section class="grid grid-cols-1">
		<span class="font-bold text-2xl">Backup & Restore Data</span>
		<div>
			<span class="font-bold">Backup Data</span>
			<div class="mb-2">
				<UButton color="primary" variant="solid" @click="downloadData">
					Download JSON Data
				</UButton>
			</div>
		</div>
		<div>
			<span class="font-bold">Restore Data</span>
			<div class="mb-2">
				<div class="flex flex-row justify-stretch">
					<UInput
						class="block mr-3 w-full"
						type="file"
						accept=".json"
						icon="i-heroicons-arrow-up-tray"
						@change="handleJsonDataSelected"
					/>
					<UButton color="primary" variant="solid" @click="submitUploadData">
						Upload JSON Data
					</UButton>
				</div>
				<div :class="uploadedJsonTextArea ? 'block' : 'hidden'">
					<span>Preview restored JSON data</span>
					<UTextarea
						v-model="uploadedJsonTextArea"
						resize
						:rows="uploadedJsonTextArea ? 10 : 1"
						placeholder="Preview restored JSON data"
						disabled
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import * as plannerService from '@/services/plannerService';
const downloadData = () => {
	plannerService.downloadData();
};

const uploadedJsonTextArea = ref(null);

const toast = useToast();
const submitUploadData = () => {
	if (!uploadedJsonTextArea.value) {
		toast.add({
			title: 'No JSON data selected',
			icon: 'i-heroicons-x-mark',
			duration: 2000,
		});
		return;
	}
	let result = [];
	if (confirm('Are you sure you want to restore this data?')) {
		result = plannerService.uploadData(JSON.parse(uploadedJsonTextArea.value));
	}

	uploadedJsonTextArea.value = null;
	toast.add({
		title: 'Data successfully restored: ' + result.join(', '),
		icon: 'i-heroicons-check-badge',
		duration: 2000,
	});
};

const handleJsonDataSelected = (uploadedFiles) => {
	const reader = new FileReader();
	reader.readAsText(uploadedFiles[0]);
	reader.onload = () => {
		const jsonData = reader.result;
		console.log(JSON.parse(jsonData));

		// show preview
		uploadedJsonTextArea.value = jsonData;
	};
};
</script>
